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

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setEnrolling(true);
        const res = await loadRazorpayScript();

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            setEnrolling(false);
            return;
        }

        const options = {
            key: "rzp_test_SNuDEU4SKczr1Q",
            amount: (data.course.price || 999) * 100, // API operates in subunits
            currency: "INR",
            name: "LEARNZILLA",
            description: `Payment for ${data.course.title} (Test Mode)`,
            handler: async function (response) {
                alert(`Payment successful! Reference ID: ${response.razorpay_payment_id}`);

                // On success, proceed with enrollment in backend
                try {
                    await axios.post('http://localhost:8080/api/student/enroll',
                        { userId: user.id || 1, courseId: id },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    navigate(`/learn/${id}`);
                } catch (err) {
                    console.error('Enrollment error', err);
                    navigate(`/learn/${id}`); // Fallback
                } finally {
                    setEnrolling(false);
                }
            },
            prefill: {
                name: user?.uname || "Student",
                email: user?.uemail || "student@example.com",
            },
            theme: {
                color: "#18181b" // Match text-main brand color
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', function (response) {
            alert("Payment failed! Please try again.");
            setEnrolling(false);
        });
        paymentObject.open();
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
                    <span className="tag" style={{ background: 'var(--text-main)', color: 'white' }}>₹{course.price || 999}</span>
                </div>
                <button onClick={handlePayment} disabled={enrolling} className="btn-enroll shine-effect">
                    {enrolling ? 'Processing...' : 'Pay & Enroll Now'}
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
