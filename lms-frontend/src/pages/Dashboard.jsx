import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Award, Users } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Unlock Your Potential with LEARNZILLA</h1>
                    <p className="hero-description">
                        Learn programming, master machine learning, and advance your career with expert-led courses.
                    </p>
                    <div className="hero-cta">
                        <Link to="/courses" className="btn btn-primary btn-large">Explore Courses</Link>
                        <Link to="/signup" className="btn btn-outline btn-large">Get Started Now</Link>
                    </div>
                </div>
                <div className="hero-image-wrapper">
                    <div className="glass-card hero-stats">
                        <div className="stat-item">
                            <PlayCircle className="stat-icon" />
                            <span>100+ Courses</span>
                        </div>
                        <div className="stat-item">
                            <Users className="stat-icon" />
                            <span>50k+ Students</span>
                        </div>
                        <div className="stat-item">
                            <Award className="stat-icon" />
                            <span>Top Instructors</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
