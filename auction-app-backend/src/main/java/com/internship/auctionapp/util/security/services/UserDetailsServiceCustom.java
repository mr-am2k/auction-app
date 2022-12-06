package com.internship.auctionapp.util.security.services;

import com.internship.auctionapp.models.JwtResponse;
import com.internship.auctionapp.requests.UserLoginRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;
import org.springframework.http.ResponseEntity;

public interface UserDetailsServiceCustom {
    JwtResponse login(UserLoginRequest loginRequest);

    String register(UserRegisterRequest registerRequest);
}
