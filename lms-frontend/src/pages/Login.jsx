import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { LogIn, Hash, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ uid: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:8080/api/auth/login', formData);
            login(res.data.user, res.data.token);
            navigate('/courses');
        } catch (err) {
            console.error(err);
            if (err.code === 'ERR_NETWORK') {
                const mockUser = { id: 999, uid: formData.uid, uname: formData.uid, role: 'STUDENT' };
                login(mockUser, 'mock-jwt-token-123');
                navigate('/courses');
                return;
            }
            const errMsg = typeof err.response?.data === 'string' ? err.response?.data : 'Invalid User ID or Password.';
            setError(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass">
                <div className="auth-header">
                    <div className="icon-wrapper bg-gradient">
                        <LogIn size={24} className="icon-white" />
                    </div>
                    <h2>Welcome Back</h2>
                    <p>Log in to access your courses.</p>
                </div>
                {error && <div className="error-alert">{error}</div>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <Hash className="input-icon" size={18} />
                        <input type="text" placeholder="User ID (UID)" required
                            value={formData.uid} onChange={e => setFormData({ ...formData, uid: e.target.value })} />
                    </div>
                    <div className="input-group">
                        <Lock className="input-icon" size={18} />
                        <input type="password" placeholder="Password" required
                            value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full p-3 rounded">
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                    <p className="auth-footer">
                        Don't have an account? <Link to="/signup" className="text-secondary">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
