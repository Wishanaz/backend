import React from "react";
import InputGroup from "../components/InputGroup";
import "../style/register.scss";
import { Link } from "react-router";

const Register = () => {
  return (
    <main className="register-page">
      <form className="form-container">
        <div className="form-header">
          <h1>Create Account</h1>
          <p>Join Moodify and start tracking your emotions.</p>
        </div>

        <InputGroup
          label="Username"
          placeholder="Enter your username"
          type="text"
        />

        <InputGroup
          label="Email"
          placeholder="Enter your email"
          type="email"
        />

        <InputGroup
          label="Password"
          placeholder="Create a password"
          type="password"
        />

        <button type="submit" className="button">
          Create Account
        </button>

        <p className="auth-switch">
          Already have an account?
          <Link to="/login" className="switch-link">
            Login here
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Register;