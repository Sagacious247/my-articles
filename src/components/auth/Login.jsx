import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSignin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            
            navigate("/")

        }catch(error) {
          toast(error.code, {type: "error"})
        }
    }

  return (
    <div className='border p-3 bg-light mx-auto'
    style={{maxWidth: 400, marginTop: 70}}>
      <h1>Login</h1>

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
       onClick={handleSignin}
      className="btn btn-primary">Login</button>
    </div>
  )
}

export default Login
