import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, User, Mail, Phone, Lock, Hash } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        uid: '', uname: '', password: '', gmail: '', phoneNumber: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:8080/api/auth/signup', formData);
            login(res.data.user, res.data.token);
            navigate('/courses');
        } catch (err) {
            console.error(err);
            if (err.code === 'ERR_NETWORK') {
                const mockUser = { id: 999, uid: formData.uid, uname: formData.uname, gmail: formData.gmail, role: 'STUDENT' };
                login(mockUser, 'mock-jwt-token-123');
                navigate('/courses');
                return;
            }
            const errMsg = typeof err.response?.data === 'string' ? err.response?.data : 'Failed to sign up. Please try again.';
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
                        <UserPlus size={24} className="icon-white" />
                    </div>
                    <h2>Create Account</h2>
                    <p>Join the LMS platform today.</p>
                </div>
                {error && <div className="error-alert">{error}</div>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <Hash className="input-icon" size={18} />
                        <input type="text" placeholder="User ID (UID)" required
                            value={formData.uid} onChange={e => setFormData({ ...formData, uid: e.target.value })} />
                    </div>
                    <div className="input-group">
                        <User className="input-icon" size={18} />
                        <input type="text" placeholder="Username (uname)" required
                            value={formData.uname} onChange={e => setFormData({ ...formData, uname: e.target.value })} />
                    </div>
                    <div className="input-group">
                        <Mail className="input-icon" size={18} />
                        <input type="email" placeholder="Email (gmail)" required
                            value={formData.gmail} onChange={e => setFormData({ ...formData, gmail: e.target.value })} />
                    </div>
                    <div className="input-group">
                        <Phone className="input-icon" size={18} />
                        <input type="tel" placeholder="Phone Number"
                            value={formData.phoneNumber} onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })} />
                    </div>
                    <div className="input-group">
                        <Lock className="input-icon" size={18} />
                        <input type="password" placeholder="Password" required minLength="6"
                            value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full p-3 rounded">
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                    <p className="auth-footer">
                        Already have an account? <Link to="/login" className="text-secondary">Log in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
