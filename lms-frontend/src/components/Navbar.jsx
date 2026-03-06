import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, User as UserIcon } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar glass">
            <div className="nav-brand">
                <BookOpen size={28} className="brand-icon" />
                <Link to="/">LEARNZILLA</Link>
            </div>
            <div className="nav-links">
                <Link to="/courses" className="nav-link">Courses</Link>
                {user ? (
                    <div className="user-menu">
                        <span className="user-greeting">
                            <UserIcon size={18} /> {user.uname}
                        </span>
                        <button onClick={handleLogout} className="btn-icon">
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                ) : (
                    <div className="auth-buttons">
                        <Link to="/login" className="btn btn-outline">Login</Link>
                        <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
