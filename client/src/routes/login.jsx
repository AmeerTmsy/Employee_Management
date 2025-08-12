import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux'
//import { authenticate } from '../features/login/loginSlice';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passEyeSee, setPassEyeSee] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });
    
    const navigate = useNavigate();
    const { login } = useSelector((state) => state.login)
    useEffect(() => {
        if (login) navigate('/');
    }, [login])

    const validateForm = () => {
        let valid = true;
        let newErrors = { email: '', password: '' }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email';
            valid = false;
        } 

        const passRregex = /(?:.*\d.*){4,}/;
        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (!passRregex.test(password)) {
            newErrors.password = 'Your password should contain at least 4 numbers';
            valid = false;
        } 

        setErrors(newErrors);
        return valid;
    }

    // useEffect(() => {
    //     // if (login) navigate('/')
    // }, [login]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        const data = { "email": email, "password": password }
        console.log("data: ", data);
        //dispatch(authenticate(true))
    };

    return (
        <>
            <div className='loginDiv_1'>
                <form className='loginForm' onSubmit={handleSubmit} noValidate>
                    <div className='formSec formSec1'>
                    </div>
                    <div className='formSec formSec2'>
                        <div className='profile-pic '>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/9706/9706583.png"
                                alt="profile pick"
                                className='profilePick'
                            />
                        </div>
                        <h1 className='loginH1'>Login</h1>
                        <div className='passwordFieldWrap'>
                            <div className='passDiv'>
                                <input
                                    className='py-2 px-5'
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {errors.email && <p className="error">{errors.email}</p>}
                        </div>
                        <div className='passwordFieldWrap'>
                            <div className='passDiv'>
                                <input
                                    className='py-2 px-5'
                                    type={passEyeSee ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                {
                                    passEyeSee ?
                                        (<i onClick={() => setPassEyeSee(false)} className="ri-eye-line pr-1"></i>)
                                        :
                                        (<i onClick={() => setPassEyeSee(true)} className="ri-eye-off-line pr-1"></i>)
                                }

                            </div>
                            {errors.password && <p className="error">{errors.password}</p>}
                            <Link className='forgotLink' to={'/forgotPassword'}>forgot password?</Link>
                        </div>
                        <div className=''>
                            <button type="submit" className='subBtn'>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;