import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/signup', { username, email, password });
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify({ username, email }));
                console.log('User signed up successfully');
                navigate('/dashboard');
            } else {
                alert("Something went wrong!!");
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
                <button type="button" className="btn btn-link" onClick={() => navigate('/login')}>Already member? Login</button>
            </form>
        </div>
    );
};

export default Signup;