import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import axios from 'axios'

const Register = () => {

  //usestate for name,email,password
  const [formData, setFormData] = useState({username:"", email:"", password:""})

  const {handleRegister, loading} = useAuth()
  const navigate = useNavigate()

  if(loading){
    return(
      <main><h1>Loading...</h1></main>
    )
  }

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value})
  }

  // form submission handle
  const handleSubmit = async (e)=>{
    e.preventDefault()

    await handleRegister(formData.username, formData.email, formData.password).then(res => console.log(res), navigate("/"))
  }



  return (
  <main className='form'>
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
        <button className='button primary-button' type="submit">Register</button>

        <p>Already have an account? <Link className='toggleAuthForm' to='/login'>Login.</Link> </p>


      </form>
    </div>
  </main>
  )
}

export default Register