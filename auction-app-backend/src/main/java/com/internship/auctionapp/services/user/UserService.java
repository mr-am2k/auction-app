package com.internship.auctionapp.services.user;

import com.internship.auctionapp.models.JwtResponse;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.requests.UserLoginRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;
import org.springframework.http.ResponseEntity;

public interface UserService {
    JwtResponse login(UserLoginRequest loginRequest);

    User register(UserRegisterRequest registerRequest);
}
