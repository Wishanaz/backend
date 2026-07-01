import React from "react";
import InputGroup from "../components/InputGroup";
import "../style/login.scss";
import { Link } from "react-router";
import { useState } from "react";

import {useAuth} from "../hooks/useAuth";

import {useNavigate} from "react-router";

const Login = () => {

  const {loading, handleLogin} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // handle submit function
  async function handleSubmit(e){
    e.preventDefault()

    await handleLogin({
        identifier: email,
        password
    })

    navigate("/")
}

  return (
    <main className="login-page">
      <form  onSubmit={handleSubmit} className="form-container">
        <div className="form-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue your Moodify journey.</p>
        </div>

        <InputGroup
    label="Email or Username"
    placeholder="Enter your email or username"
    type="text"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
/>

        <InputGroup
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" />
            Remember me
          </label>

          <button type="button" className="forgot-password">
            Forgot Password?
          </button>
        </div>

        <button type="submit" className="button">
          Login
        </button>

        <p className="auth-switch">
          Don't have an account?
          <Link to="/register" className="switch-link">
            Register here
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
