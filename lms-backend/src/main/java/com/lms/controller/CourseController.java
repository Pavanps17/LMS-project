package com.lms.controller;

import com.lms.entity.Course;
import com.lms.entity.Lesson;
import com.lms.entity.Section;
import com.lms.repository.CourseRepository;
import com.lms.repository.LessonRepository;
import com.lms.repository.SectionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseRepository courseRepository;
    private final SectionRepository sectionRepository;
    private final LessonRepository lessonRepository;

    public CourseController(CourseRepository courseRepository, SectionRepository sectionRepository, LessonRepository lessonRepository) {
        this.courseRepository = courseRepository;
        this.sectionRepository = sectionRepository;
        this.lessonRepository = lessonRepository;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCourseDetails(@PathVariable Long id) {
        Optional<Course> courseOpt = courseRepository.findById(id);
        if (courseOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Course course = courseOpt.get();
        List<Section> sections = sectionRepository.findByCourseIdOrderBySectionOrderAsc(id);
        
        Map<String, Object> response = new HashMap<>();
        response.put("course", course);
        
        List<Map<String, Object>> sectionsWithLessons = sections.stream().map(section -> {
            Map<String, Object> sectionMap = new HashMap<>();
            sectionMap.put("section", section);
            sectionMap.put("lessons", lessonRepository.findBySectionIdOrderByLessonOrderAsc(section.getId()));
            return sectionMap;
        }).toList();
        
        response.put("sections", sectionsWithLessons);
        
        return ResponseEntity.ok(response);
    }
}
