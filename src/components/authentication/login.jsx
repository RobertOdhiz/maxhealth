import firebase from '../../providers/firebase';
import React, { useState } from 'react';
import Registration from './registration';
import './styles/login.css';
import { fetchSignInMethodsForEmail, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1);
  const [hasAccount, setHasAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPasswordShown, setisPasswordShown] = useState(false);

  const navigate = useNavigate();

  const auth = firebase.auth;

  const handleLogin = async (form) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const email = form.email;
      const password = form.password;

      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckEmailExists = async (email) => {
    setIsLoading(true);
    setIsError(false);
  
    try {
      const user = await fetchSignInMethodsForEmail({ email });
      if (user.length === 0) {
        setHasAccount(false);
        setStep(2);
      } else {
        setHasAccount(true);
        setStep(2);
      }
    } catch (error) {
      navigate('/register', { email: formData.email });
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleOauthSignIn = () => {
    // Implement Google OAuth sign-in using Firebase Authentication methods
    console.log('Google OAuth sign-in not implemented yet');
  };

  const handleFacebookOauthSignIn = () => {
    // Implement Facebook OAuth sign-in using Firebase Authentication methods
    console.log('Facebook OAuth sign-in not implemented yet');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <div className="container">
      <div className="login-container">
      <h2>Login Or Sign Up</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (step === 1) {
          handleCheckEmailExists(formData.email);
        } else if (step === 2) {
          handleLogin(formData);
        }
      }} className="form-container">
        {step === 1 && (
          <div className='fields'>
            <input
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange(e)}
              placeholder="Email Address"
            />
            <button type="submit" className="btn">
              Continue with email
            </button>
          </div>
        )}
        {step === 2 && !hasAccount && (
          <Registration email={formData.email} />
        )}
        {step === 2 && hasAccount && (
          <div className='fields'>
            <input
              name="password"
              type={isPasswordShown ? 'text' : 'password'}
              onChange={(e) => handleInputChange(e)}
              value={formData.password}
              placeholder="Password"
            />
            <button type="submit" className="btn">
              {isLoading ? 'Logging you In' : 'Login'}
            </button>
            {isError && <p className="error-message">Login failed. Please check your email and password.</p>}
          </div>
        )}
      </form>
      <p className="or-txt">
        <hr />
        or
        <hr />
      </p>
      <div className="oauth-btns">
        <button onClick={handleGoogleOauthSignIn} className="btn" disabled={isLoading}>
          Continue with Google
        </button>
        <button onClick={handleFacebookOauthSignIn} className="btn" disabled={isLoading}>
          Continue with Facebook
        </button>
      </div>
      </div>
    </div>
  );
}

export default Login;
