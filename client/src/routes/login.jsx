import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authenticate } from '../features/login/loginSlice';
import googleIcon from '../assets/googleIcon.png'

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passEyeSee, setPassEyeSee] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });
    const location = useLocation();

    const navigate = useNavigate();
    const { login } = useSelector((state) => state.login)
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const API_URL = import.meta.env.VITE_API_URL;
    //     console.log("API URL:", API_URL);

    //     fetch(`${API_URL}/api/check`, {
    //         method: "GET",
    //         headers: {
    //             "ngrok-skip-browser-warning": "true",
    //         },
    //     })
    //         .then(async res => {
    //             const text = await res.text();
    //             try {
    //                 const data = JSON.parse(text);
    //                 console.log("ip check:", data);
    //             } catch {
    //                 console.error("Not JSON, got:", text);
    //             }
    //         })
    //         .catch(err => console.error(err));
    // }, []);

    useEffect(() => {
        if (login) {
            const redirectPath = location.state?.from || '/';
            navigate(redirectPath, { replace: true });
        }
    }, [login, navigate, location.state])

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const payload = { "email": email, "password": password }
        console.log("URL: ", import.meta.env.VITE_API_URL)
        try {
            let url = `${import.meta.env.VITE_API_URL}/auth/login`;
            console.log(url);

            let { data } = await axios.post(
                url,
                payload,
                {
                    withCredentials: true,
                    // headers: {
                    //     "ngrok-skip-browser-warning": "true"
                    // }
                }
            )

            console.log("data: ", data);
            dispatch(authenticate({ userType: data.employee.role, name: data.employee.name, userId: data.employee._id, }));
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <>
            <div className='loginDiv_1'>
                <div className='loginForm'>
                    {/* <div className='formSec formSec1'>
                    </div> */}
                    <div className='formSec formSec2'>
                        <div className='profile-pic '>
                            <img
                                src="https://res.cloudinary.com/dves9p9u6/image/upload/v1760011913/Main_Logo_1_vd3bb3.png"
                                alt="euphoricoders logo"
                            />
                        </div>
                        <h1 className='loginH1'></h1>
                        <form onSubmit={handleSubmit} noValidate>
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
                            <div className='passwordFieldWrap'>
                                <button type="submit" className='subBtn'>Submit</button>
                            </div>
                        </form>
                        <div className='passwordFieldWrap'>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button
                                    style={{ display: 'flex', justifyContent: 'center', gap: '1em', padding: '0.5em 1em', width: '100%' }}
                                    onClick={() => {
                                        window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
                                    }}
                                >
                                    <img src={googleIcon} alt="google icon" />Continue with Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;