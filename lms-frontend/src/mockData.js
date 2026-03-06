export const subjects = [
    "Java", "Python", "AI/ML", "CSS", "Graphic Design", "Testing", "Full Stack Developer"
];

const generateMockCourses = () => {
    return subjects.map((subject, idx) => ({
        id: idx + 1,
        title: `${subject} Masterclass`,
        category: subject,
        description: `Learn everything you need to know about ${subject} with this comprehensive guide on LEARNZILLA. Build real-world projects and master the fundamentals.`,
        thumbnail_url: `https://picsum.photos/seed/${subject.replace(/ /g, '').replace('/', '')}/800/600`,
        instructor: { uname: 'LEARNZILLA Expert' }
    }));
};

export const mockCourses = generateMockCourses();

export const getMockCourseDetails = (courseId) => {
    const course = mockCourses.find(c => c.id === parseInt(courseId)) || mockCourses[0];

    const lessons = [];
    for (let i = 1; i <= 10; i++) {
        lessons.push({
            id: course.id * 100 + i,
            title: `${course.category} Topic ${i}: Core Concepts`,
            duration: 10 + i * 2,
            youtubeUrl: 'https://www.youtube.com/embed/eIrMbAQSU34'
        });
    }

    return {
        course: course,
        sections: [
            {
                section: { id: course.id * 10, title: `Introduction and Basics of ${course.category}` },
                lessons: lessons
            }
        ]
    };
};
