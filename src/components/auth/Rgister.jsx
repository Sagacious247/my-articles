import React, { useState } from 'react'
import {auth, db} from '../../firebaseConfig'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { doc, setDoc } from 'firebase/firestore'

function Rgister() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const navigate = useNavigate()

    const handleSignup = async () => {
       try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

       const user = userCredential.user
        
       updateProfile(auth.currentUser, {
        displayName: name
       })

       await setDoc(doc(db, 'users', user.uid), {
        displayName: name,
        timestamp: new Date()
       })

       navigate("/")
       console.log(user)
       } catch(error) {
        toast(error.code, {type: "error"})
       }
    }
  return (
    <div className='border p-3 bg-light mx-auto' style={{marginTop: 70, maxWidth: 400}}>
      <h1>Register</h1>
      <div className="form-group">
        <label>Name</label>
        <input 
        onChange={(e) => setName(e.target.value)}
        type="text"
        className='form-control'
        placeholder='Enter your name'
         />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input 
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className='form-control'
        placeholder='Enter your email'
         />
      </div>
      <div className="form-group">
        <label>Name</label>
        <input 
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className='form-control'
        placeholder='Enter your password'
         />
      </div>
      <br />
      <button
       onClick={handleSignup}
      className="btn btn-primary">Register</button>
    </div>
  )
}

export default Rgister
