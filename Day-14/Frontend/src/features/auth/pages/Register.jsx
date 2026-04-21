import React, { useState } from 'react'
import { Link } from "react-router-dom";

import axios from 'axios'

const Register = () => {

  //usestate for name,email,password
  const [formData, setFormData] = useState({username:"", email:"", password:""})

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value})
  }

  // form submission handle
  const handleSubmit = async (e)=>{
    e.preventDefault()

  //   try{
  //     const res = await axios.post("http://localhost:3000/api/auth/register", formData, {withCredentials:true}) // yahan se data is url pe bhejo
  //     console.log(res.data)
  //   } catch(error){
  //     console.log(error.response?.data || error.message); // agar backend ne error response bhja h to uska data dekhao wrna error msg dekhao
  //   }
  }

  return (
  <main>
    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        name='username' 
        placeholder='Enter username'
        onChange={handleChange}
        />
        <input 
        type="email" 
        name='email' 
        placeholder='Enter email'
        onChange={handleChange}
        />
        <input 
        type="password" 
        name='password' 
        placeholder='Enter you password'
        onChange={handleChange}
        />
        <button type="submit">Register</button>

        <p>Already have an account? <Link className='toggleAuthForm' to='/login'>Login</Link> </p>


      </form>
    </div>
  </main>
  )
}

export default Register