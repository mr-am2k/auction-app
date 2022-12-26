package com.internship.auctionapp.controllers;

import com.internship.auctionapp.models.User;
import com.internship.auctionapp.requests.UpdateUserRequest;
import com.internship.auctionapp.services.user.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.hibernate.sql.Update;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "*", maxAge = 3600)
@Tag(name = "User")
@SecurityRequirement(name = "Bearer Authentication")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public User getSingleUser(@PathVariable("id") UUID id){
        return userService.getSingleUser(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable("id") UUID id,@RequestBody UpdateUserRequest updateUserRequest){
        return userService.updateUser(id, updateUserRequest);
    }
}
