package com.internship.auctionapp.services.user;

import com.internship.auctionapp.models.AuthResponse;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.requests.UserLoginRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;
import com.internship.auctionapp.util.security.services.AuthService;

import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class DefaultUserService implements UserService {
    private final AuthService authService;

    public DefaultUserService(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public AuthResponse login(UserLoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @Override
    public User register(UserRegisterRequest registerRequest) {
        return authService.register(registerRequest);
    }
}
