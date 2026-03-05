package com.lms.controller;

import com.lms.entity.Enrollment;
import com.lms.entity.Progress;
import com.lms.repository.CourseRepository;
import com.lms.repository.EnrollmentRepository;
import com.lms.repository.LessonRepository;
import com.lms.repository.ProgressRepository;
import com.lms.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final EnrollmentRepository enrollmentRepository;
    private final ProgressRepository progressRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;

    public StudentController(EnrollmentRepository enrollmentRepository, ProgressRepository progressRepository, UserRepository userRepository, CourseRepository courseRepository, LessonRepository lessonRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.progressRepository = progressRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
    }

    @PostMapping("/enroll")
    public ResponseEntity<?> enroll(@RequestBody Map<String, Long> request) {
        Long userId = request.get("userId");
        Long courseId = request.get("courseId");

        if (enrollmentRepository.findByUserIdAndCourseId(userId, courseId).isPresent()) {
            return ResponseEntity.badRequest().body("Already enrolled");
        }

        Enrollment enrollment = Enrollment.builder()
                .user(userRepository.findById(userId).orElseThrow())
                .course(courseRepository.findById(courseId).orElseThrow())
                .build();
        
        enrollmentRepository.save(enrollment);
        return ResponseEntity.ok("Enrolled successfully");
    }

    @GetMapping("/{userId}/enrollments")
    public List<Enrollment> getEnrollments(@PathVariable Long userId) {
        return enrollmentRepository.findByUserId(userId);
    }
    
    @GetMapping("/{userId}/progress")
    public List<Progress> getProgress(@PathVariable Long userId) {
        return progressRepository.findByUserId(userId);
    }

    @PostMapping("/progress")
    public ResponseEntity<?> markProgress(@RequestBody Map<String, Object> request) {
        Long userId = ((Number) request.get("userId")).longValue();
        Long lessonId = ((Number) request.get("lessonId")).longValue();
        // optionally update video timestamp here
        
        Progress progress = progressRepository.findByUserIdAndLessonId(userId, lessonId)
                .orElse(Progress.builder()
                        .user(userRepository.findById(userId).orElseThrow())
                        .lesson(lessonRepository.findById(lessonId).orElseThrow())
                        .build());
        
        progress.setIsCompleted(true);
        progress.setCompletionDate(LocalDateTime.now());
        
        progressRepository.save(progress);
        return ResponseEntity.ok(progress);
    }
}
