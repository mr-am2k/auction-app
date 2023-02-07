package com.internship.auctionapp.controllers;

import com.internship.auctionapp.models.AuthResponse;
import com.internship.auctionapp.models.LoginResponse;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.requests.UserLoginRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;
import com.internship.auctionapp.requests.UserSocialLoginRequest;
import com.internship.auctionapp.services.user.UserService;

import com.internship.auctionapp.util.RequestUtils;
import com.internship.auctionapp.util.security.jwt.JwtUtils;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
@Tag(name = "Auth")
public class AuthController {
    private final UserService userService;

    private final JwtUtils jwtUtils;

    public AuthController(UserService userService, JwtUtils jwtUtils) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody UserLoginRequest loginRequest) {
        return userService.login(loginRequest);
    }

    @PostMapping("/social-login")
    public LoginResponse googleLogin(@RequestBody UserSocialLoginRequest userSocialLoginRequest){
        return userService.googleLogin(userSocialLoginRequest);
    }

    @PostMapping("/register")
    public User register(@RequestBody UserRegisterRequest registerRequest) {
        return userService.register(registerRequest);
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request) {
        final String token = RequestUtils.getToken(request, RequestUtils.REFRESH);

        userService.logout(token);
    }

    @GetMapping("/refresh-token")
    public AuthResponse refreshToken(HttpServletRequest request) {
        final String token = RequestUtils.getToken(request, RequestUtils.REFRESH);
        final String username = jwtUtils.getEmailFromJwtToken(token, false);

        return userService.refreshToken(username);
    }
}
