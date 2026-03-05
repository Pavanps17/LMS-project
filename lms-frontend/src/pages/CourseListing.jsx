import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, User as UserIcon, Clock } from 'lucide-react';

const mockCourses = [
    { id: 1, title: 'Java Masterclass', category: 'Java', description: 'Learn Java from scratch to advanced. OOP, memory management, and advanced features.', thumbnail_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', instructor: { uname: 'John Doe' } },
    { id: 2, title: 'Python for Data Science', category: 'Python', description: 'Comprehensive Python programming including Pandas, NumPy and data visualization.', thumbnail_url: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', instructor: { uname: 'Jane Smith' } },
    { id: 3, title: 'Machine Learning A-Z', category: 'ML', description: 'Learn Machine Learning, NLP, Deep Learning and build real AI models.', thumbnail_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee57d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', instructor: { uname: 'Alan AI' } },
];

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
                <span className="badge">Java</span>
                <span className="badge">Python</span>
                <span className="badge">Machine Learning</span>
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
