package com.internship.auctionapp.util.security.services;

import com.internship.auctionapp.models.AuthResponse;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.requests.UserLoginRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;

import javax.servlet.http.HttpServletRequest;

public interface AuthService {
    AuthResponse login(UserLoginRequest loginRequest);

    User register(UserRegisterRequest registerRequest);
}
