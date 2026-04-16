import React from 'react'
import { Link } from "react-router-dom";

const Register = () => {
  return (
  <main>
    <div className="form-container">
      <h1>Register</h1>
      <form>
        <input type="text" name='username' placeholder='Enter username'/>
        <input type="email" name='email' placeholder='Enter email'/>
        <input type="password" name='password' placeholder='Enter you password'/>
        <button type="submit">Register</button>

        <p>Already have an account? <Link className='toggleAuthForm' to='/login'>Login</Link> </p>


      </form>
    </div>
  </main>
  )
}

export default Register