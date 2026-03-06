import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PlayCircle, Clock, BookOpen, User, CheckCircle } from 'lucide-react';

import { getMockCourseDetails } from '../mockData';
export default function CourseDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useAuth();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/courses/${id}`)
            .then(res => setData(res.data?.course ? res.data : getMockCourseDetails(id)))
            .catch(() => setData(getMockCourseDetails(id)))
            .finally(() => setLoading(false));
    }, [id]);

    const handleEnroll = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setEnrolling(true);
        try {
            await axios.post('http://localhost:8080/api/student/enroll',
                { userId: user.id || 1, courseId: id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate(`/learn/${id}`);
        } catch (err) {
            console.error('Enrollment error', err);
            // Simulate successful enrollment on error if mocked mapping
            navigate(`/learn/${id}`);
        } finally {
            setEnrolling(false);
        }
    };

    if (loading || !data) return <div className="loading-spinner"></div>;

    const course = data.course;
    const allLessons = data.sections.flatMap(s => s.lessons || []);
    const totalLessons = allLessons.length;
    const totalDuration = allLessons.reduce((acc, curr) => acc + (curr.duration || 0), 0);

    return (
        <div className="course-details-wrapper">
            <div className="course-header-banner gradient-bg">
                <h1>{course.title}</h1>
                <p className="subtitle">{course.description}</p>
                <div className="course-meta-tags">
                    <span className="tag"><User size={16} /> {course.instructor?.uname || 'Instructor'}</span>
                    <span className="tag"><BookOpen size={16} /> {totalLessons} Lessons</span>
                    <span className="tag"><Clock size={16} /> {Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
                    <span className="tag" style={{ background: 'var(--text-main)', color: 'white' }}>${course.price || 999}</span>
                </div>
                <button onClick={handleEnroll} disabled={enrolling} className="btn-enroll shine-effect">
                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </button>
            </div>

            <div className="course-content-grid">
                <div className="course-about card glass">
                    <h2>What You Will Learn</h2>
                    <ul className="learning-outcomes">
                        <li><CheckCircle className="text-secondary" /> Master the fundamentals of {course.category}</li>
                        <li><CheckCircle className="text-secondary" /> Build real-world projects from scratch</li>
                        <li><CheckCircle className="text-secondary" /> Understand complex architectural patterns</li>
                        <li><CheckCircle className="text-secondary" /> Best practices and code optimization</li>
                    </ul>

                    <h2 className="mt-8">Course Curriculum</h2>
                    <div className="curriculum-list">
                        {data.sections.map((secData, idx) => (
                            <div key={idx} className="curriculum-section">
                                <h3>Section {idx + 1}: {secData.section.title}</h3>
                                <ul>
                                    {secData.lessons.map(lesson => (
                                        <li key={lesson.id} className="curriculum-lesson">
                                            <span>
                                                <PlayCircle size={16} className="inline-icon" /> {lesson.title}
                                            </span>
                                            <span className="duration">{lesson.duration} min</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
