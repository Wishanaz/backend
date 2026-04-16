import React from 'react'
import '../styles/form.scss'
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form>
                <input type="text" name='username' placeholder='Enter username'/>
                <input type="text" name='password' placeholder='Enter your password'/>
                <button type='submit'>Login</button>

                <p>Don't have an account? <Link className='toggleAuthForm' to='/register'>Register</Link></p>
            </form>
        </div>
    </main>
  )
}

export default Login