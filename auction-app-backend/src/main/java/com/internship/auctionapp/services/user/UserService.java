package com.internship.auctionapp.services.user;

import com.internship.auctionapp.models.AuthResponse;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.requests.UserLoginRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

public interface UserService {
    AuthResponse login(UserLoginRequest loginRequest);

    User register(UserRegisterRequest registerRequest);

    void logout(HttpServletRequest request);

    User getSingleUser(UUID id);
}
