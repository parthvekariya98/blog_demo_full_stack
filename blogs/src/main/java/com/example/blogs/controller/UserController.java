package com.example.blogs.controller;

import com.example.blogs.model.User;
import com.example.blogs.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return userService.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.findByUsername(user.getUsername());
    }
}