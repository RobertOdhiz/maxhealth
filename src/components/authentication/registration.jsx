import React, { useEffect, useState, useCallback } from 'react';
import handleInputChange from '../semiComponents/utils';
import { Link } from 'react-router-dom';
import './styles/login.css'

function Registration({email}) {
    const [step, setStep] = useState(1);
    const [signUpFormData, setSignUpFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (email) {
            setSignUpFormData({
                email: email
            });
        }
    }, [email])

    const handleChange = useCallback((e) => {
        handleInputChange(e, signUpFormData, setSignUpFormData);
    }, [signUpFormData]);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    const handleRegistration = async () => {
        setIsLoading(true);

        setTimeout(() => {
            console.log('Submitting registration data:', signUpFormData);
            setIsLoading(false);
        }, 1000);
    };

    useEffect(() => {
        document.title = "Maximum Health | Sign Up";
    }, []);

    return (
        <div className='container'>
        <div className="signup-container">
        <h1 className='form-title'>Sign up</h1>
        <p>Create an account for free</p>
        <form className='form-container'>
                {step === 1 &&
                    <div className='d-in'>
                        <input
                            name='email'
                            type='email'
                            value={signUpFormData.email || ''}
                            onChange={handleChange}
                            placeholder='Email Adddress'
                        />
                        <button className="btn" onClick={handleNext}>Continue</button>
                    </div>
                }
                {step === 2 &&
                    <div className='d-in'>
                        <input
                            name='firstName'
                            type='text'
                            value={signUpFormData.firstName || ''}
                            onChange={handleChange}
                            placeholder='First Name'
                        />
                        <input
                            name='lastName'
                            type='text'
                            value={signUpFormData.lastName || ''}
                            onChange={handleChange}
                            placeholder='Last Name'
                        />
                        <div className="btns">
                            <button className="btn" onClick={handlePrev}>Previous</button>
                            <button className="btn" onClick={handleNext}>Next</button>
                        </div>
                    </div>
                }
                {step === 3 &&
                    <div className='d-in'>
                        <input
                            name='password'
                            type='password'
                            value={signUpFormData.password || ''}
                            onChange={handleChange}
                            placeholder='Password'
                        />
                        <input
                            name='confirmPassword'
                            type='password'
                            value={signUpFormData.confirmPassword || ''}
                            onChange={handleChange}
                            placeholder='Confirm Password'
                        />
                        {signUpFormData.password && signUpFormData.password === signUpFormData.confirmPassword ?
                            <p>✅ Passwords Match</p> :
                            <p>❌ Passwords Do Not Match</p>
                        }
                        <button className="btn" disabled={isLoading} type='submit'>
                            {isLoading ? "Setting things up" : "Finish"}
                        </button>
                    </div>
                }
            </form>
            <p className='or-txt'>
                <hr />
                or
                <hr />
            </p>
            <div className="oauth-btns">
                <button className='btn'>
                      Continue with Google
                </button>
                <button className='btn'>
                        Continue with FaceBook
                </button>
            </div>
            <p className='form-disclaimer'>Already have an Account? <Link to='/login'>Login</Link></p>
        </div>
    </div>
);
}

export default Registration;
