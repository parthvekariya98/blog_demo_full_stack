import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/login', { username, password });
            console.log(response.data);
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data));
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                    localStorage.setItem('username', username);
                } else {
                    localStorage.removeItem('rememberMe');
                    localStorage.removeItem('username');
                }
                navigate('/dashboard');
            } else {
                alert("Something went wrong!!");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    useEffect(() => {
        const rememberedUser = localStorage.getItem('rememberMe') === 'true';
        if (rememberedUser) {
            const storedUsername = localStorage.getItem('username');
            setUsername(storedUsername);
            setRememberMe(true);
        }
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="container" style={{ maxWidth: "450px" }}>
                <div className="card shadow">
                    <div className="card-body">
                        <h1 className="card-title text-center mb-4">Login</h1>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" className="form-control" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="mb-3 form-check d-flex justify-content-between align-items-center">
                                <div>
                                    <input type="checkbox" className="form-check-input" id="rememberMe" checked={rememberMe} onChange={handleRememberMeChange} />
                                    <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                                </div>
                                <Link to="/forgotpassword">Forgot Password?</Link>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary btn-block w-100">Login</button>
                            </div>
                            <p className="text-center mt-3">New member? <button type="button" className="btn btn-link p-0" onClick={() => navigate('/signup')}>Signup</button></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
