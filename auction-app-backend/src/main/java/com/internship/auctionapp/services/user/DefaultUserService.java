package com.internship.auctionapp.services.user;

import com.internship.auctionapp.models.AuthResponse;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.repositories.user.UserRepository;
import com.internship.auctionapp.requests.UserLoginRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;
import com.internship.auctionapp.util.security.services.AuthService;

import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@Service
public class DefaultUserService implements UserService {
    private final AuthService authService;

    private final UserRepository userRepository;

    public DefaultUserService(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @Override
    public AuthResponse login(UserLoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @Override
    public User register(UserRegisterRequest registerRequest) {
        return authService.register(registerRequest);
    }

    @Override
    public void logout(HttpServletRequest request) {
        authService.logout(request);
    }

    @Override
    public User getSingleUser(UUID id) {
        return userRepository.getSingleUser(id);
    }
}
