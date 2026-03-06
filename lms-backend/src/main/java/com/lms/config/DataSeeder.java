package com.lms.config;

import com.lms.entity.Course;
import com.lms.entity.Lesson;
import com.lms.entity.Section;
import com.lms.repository.CourseRepository;
import com.lms.repository.LessonRepository;
import com.lms.repository.SectionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner loadData(
            CourseRepository courseRepository,
            SectionRepository sectionRepository,
            LessonRepository lessonRepository) {
        return args -> {
            if (courseRepository.count() == 0) {
                String[] subjects = {
                        "Java", "Python", "AI/ML", "CSS", "Graphic Design", "Testing", "Full Stack Developer"
                };

                for (String subject : subjects) {
                    Course course = Course.builder()
                            .title(subject + " Masterclass")
                            .description("Learn everything you need to know about " + subject + " with this comprehensive guide on LEARNZILLA.")
                            .thumbnailUrl("https://picsum.photos/seed/" + subject.replace(" ", "") + "/800/600")
                            .category(subject)
                            .build();

                    courseRepository.save(course);

                    Section section = Section.builder()
                            .title("Introduction and Basics of " + subject)
                            .sectionOrder(1)
                            .course(course)
                            .build();
                            
                    sectionRepository.save(section);

                    for (int i = 1; i <= 10; i++) {
                        Lesson lesson = Lesson.builder()
                                .title(subject + " Topic " + i)
                                .lessonOrder(i)
                                // Mock YouTube embed URL. Real ones would be individual but we use a placeholder that works.
                                .youtubeUrl("https://www.youtube.com/embed/dQw4w9WgXcQ") 
                                .duration(10 + i * 2) // arbitrary duration
                                .section(section)
                                .build();
                        lessonRepository.save(lesson);
                    }
                }
                System.out.println("Data Seeding Complete: Added " + subjects.length + " Subjects with 10 topics each.");
            }
        };
    }
}
