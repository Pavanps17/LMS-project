package com.lms.controller;

import com.lms.entity.Role;
import com.lms.entity.User;
import com.lms.repository.UserRepository;
import com.lms.security.JwtService;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        if (userRepository.findByUid(request.getUid()).isPresent()) {
            return ResponseEntity.badRequest().body("UID already exists");
        }
        if (userRepository.findByGmail(request.getGmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Gmail already exists");
        }

        User user = User.builder()
                .uid(request.getUid())
                .uname(request.getUname())
                .password(passwordEncoder.encode(request.getPassword()))
                .gmail(request.getGmail())
                .phoneNumber(request.getPhoneNumber())
                .role(request.getRole() != null ? request.getRole() : Role.STUDENT)
                .build();

        userRepository.save(user);
        
        String token = jwtService.generateToken(user.getUid(), user.getRole().name(), user.getId());
        return ResponseEntity.ok(new AuthResponse(token, user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByUid(request.getUid());
        
        if (userOpt.isEmpty() || !passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        User user = userOpt.get();
        String token = jwtService.generateToken(user.getUid(), user.getRole().name(), user.getId());
        return ResponseEntity.ok(new AuthResponse(token, user));
    }

    @Data
    static class SignupRequest {
        private String uid;
        private String uname;
        private String password;
        private String gmail;
        private String phoneNumber;
        private Role role;
    }

    @Data
    static class LoginRequest {
        private String uid;
        private String password;
    }

    @Data
    static class AuthResponse {
        private String token;
        private User user;

        public AuthResponse(String token, User user) {
            this.token = token;
            this.user = user;
            // hide password
            this.user.setPassword(null);
        }
    }
}
