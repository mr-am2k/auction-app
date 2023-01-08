package com.internship.auctionapp.controllers;

import com.internship.auctionapp.models.User;
import com.internship.auctionapp.requests.UpdateUserDataRequest;
import com.internship.auctionapp.services.user.UserService;
import com.internship.auctionapp.util.RequestUtils;
import com.internship.auctionapp.util.security.jwt.JwtUtils;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "*", maxAge = 3600)
@Tag(name = "User")
public class UserController {
    private final UserService userService;

    private final JwtUtils jwtUtils;

    public UserController(UserService userService, JwtUtils jwtUtils) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/current/{userId}")
    public User getUser(@PathVariable("userId") UUID userId) {
        return userService.getUser(userId);
    }

    @PutMapping("/{id}")
    @SecurityRequirement(name = "Bearer Authentication")
    public User updateUser(@RequestBody UpdateUserDataRequest updateUserDataRequest, HttpServletRequest request) {
        final String token = RequestUtils.getToken(request, RequestUtils.AUTHORIZATION_HEADER, RequestUtils.BEARER);
        final String username = jwtUtils.getEmailFromJwtToken(token, true);

        return userService.updateUser(updateUserDataRequest, username);
    }

    @PostMapping("/current/deactivate")
    @SecurityRequirement(name = "Bearer Authentication")
    public void deactivate(HttpServletRequest request) {
        final String token = RequestUtils.getToken(request, RequestUtils.AUTHORIZATION_HEADER, RequestUtils.BEARER);
        final String username = jwtUtils.getEmailFromJwtToken(token, true);

        userService.deactivate(username);
    }
}
