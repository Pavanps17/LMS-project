import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Play, CheckCircle, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

const mockCourseDetails = {
    course: { id: 1, title: 'Java Masterclass' },
    sections: [
        {
            section: { id: 1, title: 'Basics of Java' },
            lessons: [
                { id: 1, title: 'Variables and Data Types', duration: 15, youtubeUrl: 'eIrMbAQSU34' },
                { id: 2, title: 'Control Flow (If, loops)', duration: 25, youtubeUrl: 'grEKMHGYyns' }
            ]
        },
        {
            section: { id: 2, title: 'Object Oriented Programming' },
            lessons: [
                { id: 3, title: 'Classes and Objects', duration: 30, youtubeUrl: 'IUqKuEjtNxw' },
                { id: 4, title: 'Inheritance and Polymorphism', duration: 40, youtubeUrl: 'VsMpwC9k6lM' }
            ]
        }
    ]
};

export default function LearningPage() {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const { user, token } = useAuth();

    const [data, setData] = useState(null);
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch Course Details
        axios.get(`http://localhost:8080/api/courses/${courseId}`)
            .then(res => setData(res.data?.course ? res.data : mockCourseDetails))
            .catch(() => setData(mockCourseDetails))
            .finally(() => setLoading(false));

        // Fetch Progress Tracking
        if (user) {
            axios.get(`http://localhost:8080/api/student/${user.id || 1}/progress`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => setProgress(res.data.map(p => p.lesson?.id || p.lesson_id)))
                .catch(() => setProgress([]));
        }
    }, [courseId, user, token]);

    if (loading || !data) return <div className="loading-spinner"></div>;

    const allLessons = data.sections.flatMap(s => s.lessons || []);
    const currentIndex = lessonId ? allLessons.findIndex(l => l.id === parseInt(lessonId)) : 0;
    const currentLesson = allLessons[Math.max(0, currentIndex)];
    const completedCount = progress.length;
    const progressPerc = Math.round((completedCount / (allLessons.length || 1)) * 100);

    const markAsCompleteAndNext = async (lessonIdToMark) => {
        if (user) {
            try {
                await axios.post('http://localhost:8080/api/student/progress',
                    { userId: user.id || 1, lessonId: lessonIdToMark },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (e) {
                console.log('Progress mocked');
            }
        }

        if (!progress.includes(lessonIdToMark)) {
            setProgress([...progress, lessonIdToMark]);
        }

        // Move to next lesson
        if (currentIndex < allLessons.length - 1) {
            navigate(`/learn/${courseId}/${allLessons[currentIndex + 1].id}`);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            navigate(`/learn/${courseId}/${allLessons[currentIndex - 1].id}`);
        }
    };

    // Extract Video ID if full URL is given, or default
    const getEmbedUrl = (url) => {
        if (!url) return '';
        if (url.includes('embed')) return url;
        const videoId = url.split('v=')[1] || url.split('/').pop() || url;
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
        return `https://www.youtube.com/embed/${videoId}`;
    };

    return (
        <div className="learning-container">
            <div className="learning-sidebar glass">
                <div className="sidebar-header">
                    <h2>{data.course.title}</h2>
                    <div className="progress-indicator">
                        <div className="progress-text">
                            <span>{progressPerc}% Complete</span>
                            <span>{completedCount}/{allLessons.length}</span>
                        </div>
                        <div className="progress-bar-bg">
                            <div className="progress-bar-fill pattern-overlay" style={{ width: `${progressPerc}%` }}></div>
                        </div>
                    </div>
                </div>
                <div className="sidebar-content">
                    {data.sections.map((secData, idx) => (
                        <div key={idx} className="sidebar-section">
                            <div className="section-title">
                                <BookOpen size={16} /> {secData.section.title}
                            </div>
                            <div className="section-lessons">
                                {secData.lessons.map(lesson => {
                                    const isCurrent = lesson.id === currentLesson?.id;
                                    const isCompleted = progress.includes(lesson.id);
                                    return (
                                        <div
                                            key={lesson.id}
                                            onClick={() => navigate(`/learn/${courseId}/${lesson.id}`)}
                                            className={`lesson-item ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                                        >
                                            <div className="lesson-icon">
                                                {isCompleted ? <CheckCircle size={16} className="text-secondary" /> : <Play size={16} />}
                                            </div>
                                            <div className="lesson-info">
                                                <span className="truncate">{lesson.title}</span>
                                                <span className="lesson-duration">{lesson.duration}m</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="learning-main">
                <div className="video-player-wrapper">
                    <iframe
                        className="youtube-iframe"
                        src={`${getEmbedUrl(currentLesson?.youtubeUrl)}?rel=0`}
                        title={currentLesson?.title || "Video Player"}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                </div>

                <div className="lesson-content glass">
                    <div className="lesson-header">
                        <h2>{currentLesson?.title}</h2>
                        <div className="lesson-controls">
                            <button
                                onClick={handlePrevious}
                                disabled={currentIndex === 0}
                                className="btn btn-outline"
                            >
                                <ArrowLeft size={18} /> Previous
                            </button>
                            <button
                                onClick={() => markAsCompleteAndNext(currentLesson.id)}
                                className="btn btn-primary"
                            >
                                {progress.includes(currentLesson?.id) ? 'Next Lesson' : 'Mark as Complete & Next'} <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
