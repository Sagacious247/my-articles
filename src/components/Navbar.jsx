import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo.png'
// import {useAuthState} from "react-firebase-hooks/auth"
import { auth, db, storage } from '../firebaseConfig'
import { signOut } from 'firebase/auth'
import { UserAuth } from './auth/AuthContext'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { toast } from 'react-toastify'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

function Navbar() {
  const {user} = UserAuth()
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate()
  })

  // const [user] = useAuthState(auth)

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleImageChange = (e) => {
     setFormData({...formData, image: e.target.files[0]})
  }

  const handlePublish = () => {
    if(!formData.title || !formData.description || !formData.image) {
      alert("Please fill all the fields")
      return
    }

    const storageRef = ref(storage, `images/${Date.now()}${formData.image.name}`)

    const uploadImage = uploadBytesResumable(storageRef, formData.image)

    uploadImage.on("state_changed",
    (snapshot) => {
      const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

      setProgress(progressPercent);
    },
    (err) => {
      console.log(err);
    },
    () => {
      setFormData({
        title: "",
        description: "",
        image: ""
      });
      getDownloadURL(uploadImage.snapshot.ref).then((url) => {
        const articleRef = collection(db, 'Articles');
        addDoc(articleRef, {
          title: formData.title,
          description: formData.description,
          imageUrl: url,
          createdAt: Timestamp.now().toDate(),
          createBy: user.displayName,
          userId: user.uid,
          likes: [],
          comments: []
        })
        .then(() => {
          toast("Article added successfully", {type: "success"})
          setProgress(0)
        })
        .catch(err => {
          toast("Error adding article", {type: "error"})
        }) 
      })
    }
    );
  };

  const handleClick = () => {
    setOpen(!open)
  }

    // const [user] = useAuthState(auth)
  return (
    <div className='fixed-top border' 
    style={{backgroundColor: "milk"}}>
      
      <nav className="navbar" style={{maxWidth: "1300px", margin: "auto"}} >
        <div className="hamburger" onClick={handleClick}>
             {open ? <CloseIcon/> : <MenuIcon/>}
          </div>
        <div>
            <img src={logo} width={70} height={50} alt="logo" />
        </div>
        <Link to="/" className='nav-link'>
          Home
        </Link>
        <div>
            {user && (
                <>
                 <span className="pe-4">
                    Signed as {user.displayName || user.email}
                 </span>

                 <button className="btn btn-primary"
                 onClick={() => signOut(auth)}>
                    Logout
                 </button>
                </>
            )}
        </div>

        {/* Mobile */}

        <div className={`border p-3  bg-light ${open ? "mobile__add active" : "mobile__add"}`} style={{marginTop: 70}}>
{
  !user ? (
    <>
   <h2> <Link to="/signin">
    Login to create article
    </Link></h2>

    Don't have an account? <Link to="/register">Register</Link>
    </>
  ) : (

<>
 <h2>Created article</h2>
<label htmlFor="">Title</label>
<input type="text"
 name='title' 
 className='form-control' 
 value={formData.title} 
 onChange={(e) => handleChange(e)}/>

<label htmlFor="">Description</label>
<textarea
 value={formData.description} 
 name="description" 
 className='form-control'
 onChange={(e) => handleChange(e)}>
 </textarea>


{/* Image */}
<label htmlFor="">Image</label>
<input 
type="file" 
name='image' 
accept='image/*' 
className='progress' 
onChange={(e) => handleImageChange(e)}/>

{progress === 0 ? null : (
  <div className="progress">
  <div className="progress-bar progress-bar-striped mt-2" 
  style={{width: `${progress}%`}}>
    {`uploading image ${progress}%`}
  </div>
</div> 
)}

<button onClick={handlePublish} className="form-control btn-primary mt-2">
  Publish
</button>
</>
  )
}
</div>
      </nav>
    </div>
  )
}

export default Navbar
