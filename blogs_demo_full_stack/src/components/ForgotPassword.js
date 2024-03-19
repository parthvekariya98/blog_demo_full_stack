import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/blogify_logo.png';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            //Forgot password api call in progress
        } catch (error) {
            setMessage('');
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="container" style={{ maxWidth: "400px" }}>
                <div className="card shadow">
                    <div className="card-body text-center">
                        <img
                            src={logo}
                            height="38"
                            className="mb-4"
                            alt="blogify logo"
                        />
                        <h2 className="card-title mb-4">Forgot your password?</h2>
                        <p className="mb-3">Enter the email address associated with your account, and we'll send you a link to reset your password.</p>
                        <form onSubmit={handleResetPassword}>
                            <div className="mb-3">
                                <input type="email" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            {message && <p className="text-success mb-3">{message}</p>}
                            {error && <p className="text-danger mb-3">{error}</p>}
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary btn-block w-100">Reset Password</button>
                            </div>
                            <p className="text-center mt-3"><button type="button" className="btn btn-link p-0" onClick={() => navigate('/login')}>Go back</button></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
