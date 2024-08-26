import React, { useState, useRef, useEffect, useContext } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa6";
import axios from '../../api/axios';
//import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
const LOGIN_URL = '/auth';

const LoginForm = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    //    const errRef = useRef();
    const errorRef = useRef(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        if (useRef.current) {
            useRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setErrorMessage('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data.accessToken;
            const roles = response?.data.roles;
            setAuth({ username, password, roles, accessToken })
            setUsername('');
            setPassword('');
            setShowSuccessMessage(true);

        } catch (error) {
            if (!error.response) {
                setErrorMessage('No server response');
            } else if (error.response?.status === 400) {
                setErrorMessage('Missing Username of password');
            } else if (error.response?.status === 401) {
                setErrorMessage('Unauthorized');
            } else {
                setErrorMessage('Login Failed');
            }
            if (errorRef.current) {
                errorRef.current.focus();
            }
        }


    };

    return (
        <>
            {showSuccessMessage ? (
                <section>
                    <h1> dang nhap thanh cong</h1>
                    <br />
                    <p>
                        <a href="https://www.google.com.vn/?hl=vi">Go to Home</a>
                    </p>
                </section>
            ) : (
                <div className='wrapper'>
                    {showSuccessMessage && (
                        <div className="success-message">Đăng nhập thành công!</div>
                    )}
                    {errorMessage && (
                        <div className="error-message">{errorMessage}</div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                id='username'
                                placeholder='Username'
                                ref={userRef}
                                required
                                value={username}
                                autoComplete='off'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <FaUser className='icon' />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                id="password"
                                placeholder='Password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FaLock className='icon' />
                        </div>

                        <div className="remember-forgot">
                            <label><input type="checkbox" />Remember me</label>
                            <a href="https://www.google.com.vn/?hl=vi"> Forgot password? </a>
                        </div>

                        <button type="submit">Login</button>

                        <div className="register-link">
                            <p>Don't have an account?<a href="https://www.google.com.vn/?hl=vi">Reginster</a></p>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

export default LoginForm;