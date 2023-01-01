package com.internship.auctionapp.services.user;

import com.internship.auctionapp.models.AuthResponse;
import com.internship.auctionapp.models.LoginResponse;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.requests.UpdateCardRequest;
import com.internship.auctionapp.requests.UpdateUserRequest;
import com.internship.auctionapp.requests.UserLoginRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

public interface UserService {
    LoginResponse login(UserLoginRequest loginRequest);

    User register(UserRegisterRequest registerRequest);

    void logout(HttpServletRequest request);

    AuthResponse refreshToken(HttpServletRequest request);

    User getSingleUser(HttpServletRequest request);

    User updateUser(UUID id, UpdateUserRequest updateUserRequest, UpdateCardRequest updateCardRequest);

    void deactivate(HttpServletRequest request);
}
