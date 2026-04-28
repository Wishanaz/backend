import React, { useState } from 'react'
import '../styles/form.scss'
import { Link } from "react-router-dom";

import axios from 'axios'

import { useAuth } from '../hooks/useAuth';

import { useNavigate } from 'react-router-dom';

const Login = () => {

  // usestate for name and password
  const [formData, setFormData] = useState({username:"", password:""})

  const {user, handleLogin, loading} = useAuth()

  const navigate = useNavigate()

  if(loading){
    return(
      <main><h1>Loading...</h1></main>
    )
  }

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await handleLogin(formData.username, formData.password).then(res => {console.log(res), navigate("/")})

 
  }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                name='username' 
                placeholder='Enter username'
                onChange={handleChange}
                />
                <input 
                type="password" 
                name='password' 
                placeholder='Enter your password'
                onChange={handleChange}
                />
                <button className='button primary-button' type='submit'>Login</button>

                <p>Don't have an account? <Link className='toggleAuthForm' to='/register'>Create One.</Link></p>
            </form>
        </div>
    </main>
  )
}

export default Login