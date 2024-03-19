import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
                    <div className="card-body">
                        <h1 className="card-title text-center mb-4">Forgot your password?</h1>
                        <p className="text-center mb-3">Enter the email address associated with your account, and we'll send you a link to reset your password.</p>
                        <form onSubmit={handleResetPassword}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
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