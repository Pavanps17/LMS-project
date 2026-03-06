import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, User as UserIcon, Clock } from 'lucide-react';

import { mockCourses, subjects } from '../mockData';
export default function CourseListing() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/api/courses')
            .then(res => setCourses(res.data.length > 0 ? res.data : mockCourses))
            .catch(() => setCourses(mockCourses)) // Fallback to mock data if backend unavailable
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="loading-spinner"></div>;

    return (
        <div className="courses-container">
            <h1 className="page-title text-gradient">Explore Our Courses</h1>
            <div className="filters">
                <span className="badge active">All</span>
                {subjects.map(sub => (
                    <span key={sub} className="badge">{sub}</span>
                ))}
            </div>

            <div className="course-grid">
                {courses.map(course => (
                    <div key={course.id} className="course-card glass">
                        <div className="card-img-wrapper">
                            <img src={course.thumbnail_url} alt={course.title} className="course-thumbnail" />
                            <span className="category-badge">{course.category}</span>
                        </div>
                        <div className="card-body">
                            <h3 className="course-title">{course.title}</h3>
                            <p className="course-desc truncate">{course.description}</p>

                            <div className="course-meta">
                                <span className="instructor">
                                    <UserIcon size={14} /> {course.instructor?.uname || 'Expert Instructor'}
                                </span>
                            </div>

                            <Link to={`/courses/${course.id}`} className="btn-primary p-2 text-center rounded block mt-4">
                                View Details & Enroll
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
