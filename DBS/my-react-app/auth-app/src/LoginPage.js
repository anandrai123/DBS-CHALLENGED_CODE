import './App.css'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9090/api/auth/login', {
        email,
        password,
      });
      if ({email} && {password}) {
        setValid(true);
      }
      setSubmitted(true);
      const data = response.data;
      if (data.success) {
        localStorage.setItem('token', data.authtoken);
        onLogin(data.authtoken);
        navigate('/dashboard');
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred while log in -> '+error.response.data);
    }
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);


  return (
     
    <div className="form-container">
      <form className="register-form" onSubmit={handleLogin}>
      {error && (
           <div className="success-message">
             <h1>
              {" "}
              {error}{" "}
            </h1>
            </div>
        )}
        {submitted && valid && !error && (
          <div className="success-message">
            <h3>
              {" "}
              Welcome {email} {" "}
            </h3>
            <div> Your Login was successful! </div>
          </div>
        )}
      

        {!valid && (
          <input
                    className="form-field"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
        )}

        {submitted && !email && (
          <span id="email-error">Please enter an email address</span>
        )}
		
		 {!valid && (
          <input
          className="form-field"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          pattern="(?=.*\d)(?=.*[!@#$%^&])(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
          required
      />
      
        )}

          {submitted && !password && (
          <span id="password-error">Please enter a password</span>
        )}
		
        {!valid && (
          <button className="form-field" type="submit">
            Login
          </button>
        )}

        <Link to="/register">
           <button className="form-link">
              Register
           </button>
         </Link>
      </form>
    </div>           
  );
};

export default LoginPage;
