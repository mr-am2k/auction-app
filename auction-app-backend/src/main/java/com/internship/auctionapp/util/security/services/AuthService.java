package com.internship.auctionapp.util.security.services;

import com.internship.auctionapp.models.AuthResponse;
import com.internship.auctionapp.models.LoginResponse;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.requests.UserLoginRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;

public interface AuthService {
    LoginResponse login(UserLoginRequest loginRequest);

    User register(UserRegisterRequest registerRequest);

    void logout(String token);

    AuthResponse refreshToken(String username);
}
