export const subjects = [
    "Java", "Python", "AI/ML", "CSS", "Graphic Design", "Testing", "Full Stack Developer"
];

const courseDataMap = {
    "Java": {
        category: "Java",
        topics: [
            { title: "Introduction to Java", video: "A74TOX803D0" },
            { title: "What is Java? Features and Architecture", video: "bm0OyhwFDuY" },
            { title: "Setting up the Java Environment", video: "WKJkZ-v8V-M" },
            { title: "Variables, Data Types, and Operators", video: "NsqhEAE9wI0" },
            { title: "Control Flow: If/Else and Switch Statements", video: "BhtB1QEYj9s" },
            { title: "Loops in Java: For, While, Do-While", video: "Uu2M11mR-1g" },
            { title: "Introduction to Object-Oriented Programming", video: "a199KZGMNxk" },
            { title: "Classes, Objects, and Methods", video: "E61oI04sAys" },
            { title: "Inheritance and Polymorphism", video: "ZNEKioL_c9I" },
            { title: "Exception Handling and Collections", video: "1XAfapaqte4" }
        ]
    },
    "Python": {
        category: "Python",
        topics: [
            { title: "Introduction to Python", video: "YYXdXT2l-Gg" },
            { title: "What is Python? Overview and Setup", video: "kqtD5dpn9C8" },
            { title: "Python Variables and Data Types", video: "vBR_EebXyY0" },
            { title: "Operators and Input in Python", video: "tX1h41-C6Dk" },
            { title: "Conditional Statements (If-Else)", video: "awQ0Gk1R8Yc" },
            { title: "Loops: For and While Loops", video: "OnDr4J2UXSA" },
            { title: "Functions and Modules", video: "9Os0o3wzS_I" },
            { title: "Lists, Tuples, and Dictionaries", video: "W8KRlNvIjiI" },
            { title: "Object-Oriented Programming in Python", video: "JeznW_7DlB0" },
            { title: "File Handling and Exceptions", video: "Uh2ebFW8OYM" }
        ]
    },
    "AI/ML": {
        category: "AI/ML",
        topics: [
            { title: "Introduction to AI and Machine Learning", video: "JMUxmLyrhSk" },
            { title: "What is Machine Learning? Supervised vs Unsupervised", video: "ukzFI9rgwfU" },
            { title: "Python Libraries for ML: NumPy and Pandas", video: "r-uOLxNrNk8" },
            { title: "Data Preprocessing and Exploration", video: "f8d16p4W8kI" },
            { title: "Linear Regression Concepts and Math", video: "zPG4NjIkCjc" },
            { title: "Building a Linear Regression Model", video: "E5RjzSK0fvY" },
            { title: "Logistic Regression and Classification", video: "yIYKR4sgzI8" },
            { title: "Decision Trees and Random Forests", video: "ZVR2Way4nwQ" },
            { title: "Introduction to Neural Networks", video: "aircAruvnKk" },
            { title: "Evaluating ML Models (Accuracy, Precision, Recall)", video: "HwqZp928r8U" }
        ]
    },
    "CSS": {
        category: "CSS",
        topics: [
            { title: "Introduction to CSS", video: "OEV8gMkCHXQ" },
            { title: "What is CSS? Selectors and Properties", video: "1Rs2ND1ryYc" },
            { title: "Colors, Fonts, and Text Styling", video: "lFhZl0dDbnw" },
            { title: "The CSS Box Model", video: "rIO5326FgPE" },
            { title: "Margins, Padding, and Borders", video: "xZ4T5pM1-aA" },
            { title: "Layouts: Flexbox Basics", video: "fYq5PXgSsbE" },
            { title: "Layouts: Advanced Flexbox", video: "u044iM9xsWU" },
            { title: "Layouts: CSS Grid Introduction", video: "jV8B24rSN5o" },
            { title: "Responsive Design and Media Queries", video: "yU7jcbA_G4" },
            { title: "CSS Transforms, Transitions, and Animations", video: "YszONjKpgg4" }
        ]
    },
    "Graphic Design": {
        category: "Graphic Design",
        topics: [
            { title: "Introduction to Graphic Design", video: "YqQx75OPRa0" },
            { title: "What is Graphic Design? Principles of Design", video: "K7A9X70-nWg" },
            { title: "Color Theory for Designers", video: "_2LlX11t9V4" },
            { title: "Typography Fundamentals", video: "sByzHoiYHN0" },
            { title: "Composition and Layout", video: "a5KYlHNKQB8" },
            { title: "Introduction to Adobe Photoshop", video: "IyR_uYsRdPs" },
            { title: "Photo Editing and Retouching Basics", video: "aUkiq0ZWe9o" },
            { title: "Introduction to Adobe Illustrator", video: "Ib8UBwu3y5I" },
            { title: "Vector Graphics and Logo Design", video: "QzCEH8pUa5k" },
            { title: "Building a Design Portfolio", video: "eO7uFzZqH0g" }
        ]
    },
    "Testing": {
        category: "Testing",
        topics: [
            { title: "Introduction to Software Testing", video: "v_E9g_P9h9U" },
            { title: "What is Software Testing? Manual vs Automation", video: "mC1O7L4R8N8" },
            { title: "Software Testing Life Cycle (STLC)", video: "B4A09q0A4dI" },
            { title: "Test Cases, Scenarios, and Bug Reports", video: "3XzYpITiO0k" },
            { title: "Introduction to Automation Testing", video: "t1pQ4k_gXY" },
            { title: "Selenium WebDriver Basics", video: "FRn5J31eAMw" },
            { title: "Locating Elements in Selenium", video: "j7VzXzvXYU8" },
            { title: "TestNG Framework Introduction", video: "g5J0R0J0K3g" },
            { title: "API Testing with Postman", video: "VywxIQ2ZXw4" },
            { title: "Continuous Integration and Testing (CI/CD)", video: "xYJHYjM0h1I" }
        ]
    },
    "Full Stack Developer": {
        category: "Full Stack Developer",
        topics: [
            { title: "Introduction to Full Stack Development", video: "Q33KBiDriJY" },
            { title: "What is Full Stack? Frontend vs Backend", video: "PkZNo7MFOUg" },
            { title: "HTML, CSS, and JavaScript Refresher", video: "mU6anWqZJcc" },
            { title: "Frontend Frameworks: React Basics", video: "bMknfKXIFA8" },
            { title: "State Management and Hooks in React", video: "O6P86uwfdR0" },
            { title: "Backend Runtime: Introduction to Node.js", video: "TlB_eWDSMt4" },
            { title: "Building Web APIs with Express.js", video: "L72fhGm1tfE" },
            { title: "Databases: Introduction to MongoDB", video: "pWbMrx5rVBE" },
            { title: "Connecting React, Node, and MongoDB", video: "-0exw-9YJBo" },
            { title: "Deployment and Hosting your Full Stack App", video: "2tJzP5U5mE8" }
        ]
    }
}

const generateMockCourses = () => {
    return subjects.map((subject, idx) => ({
        id: idx + 1,
        title: `${subject} Masterclass`,
        category: subject,
        description: `Learn everything you need to know about ${subject} with this comprehensive guide on LEARNZILLA. Build real-world projects and master the fundamentals.`,
        thumbnail_url: `https://picsum.photos/seed/${subject.replace(/ /g, '').replace('/', '')}/800/600`,
        instructor: { uname: 'LEARNZILLA Expert' },
        price: 999
    }));
};

export const mockCourses = generateMockCourses();

export const getMockCourseDetails = (courseId) => {
    const course = mockCourses.find(c => c.id === parseInt(courseId)) || mockCourses[0];

    const courseSpec = courseDataMap[course.category];

    const lessons = [];
    if (courseSpec) {
        courseSpec.topics.forEach((topic, i) => {
            lessons.push({
                id: course.id * 100 + (i + 1),
                title: topic.title,
                duration: 15 + i * 3,
                youtubeUrl: `https://www.youtube.com/embed/${topic.video}`
            });
        });
    } else {
        // Fallback
        for (let i = 1; i <= 10; i++) {
            lessons.push({
                id: course.id * 100 + i,
                title: `${course.category} Topic ${i}: Core Concepts`,
                duration: 10 + i * 2,
                youtubeUrl: 'https://www.youtube.com/embed/eIrMbAQSU34'
            });
        }
    }

    return {
        course: course,
        sections: [
            {
                section: { id: course.id * 10, title: `Introduction and Curriculum for ${course.category}` },
                lessons: lessons
            }
        ]
    };
};
