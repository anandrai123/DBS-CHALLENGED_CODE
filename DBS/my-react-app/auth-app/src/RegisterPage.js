import './App.css'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9090/api/auth/createuser', {
        name: `${firstName} ${lastName}`,
        email,
        password,
      });
      const data = response.data;
      if ({firstName} && {lastName} && {email} && {password}) {
        setValid(true);
      }
      setSubmitted(true);
      if (data.success) {
        localStorage.setItem('token', data.authtoken);
        navigate('/dashboard');
      } else {
        console.log(data.error)
        setError(data.error);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setError('An error occurred while registering -> '+error.response.data);
      
    }
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);


  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleRegister}>
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
              Welcome {firstName} {lastName}{" "}
            </h3>
            <div> Your registration was successful! </div>
          </div>
        )}
        {!valid && (
        <input
            className="form-field"
            type="text"
            placeholder="First Name"
            name="firstName"
           value={firstName}
           onChange={(e) => setFirstName(e.target.value)}
            required
            />
        ) }

        {submitted && !firstName && (
          <span id="first-name-error">Please enter a first name</span>
        )}

        {!valid && (
          <input
            className="form-field"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
                  />
        )}

        {submitted && !lastName && (
          <span id="last-name-error">Please enter a last name</span>
        )}

        {!valid &&  (
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
            Register
          </button>
        )}
         <Link to="/login">
           <button className="form-link">
              Login
           </button>
         </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
