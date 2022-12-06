package com.internship.auctionapp.services.user;

import com.internship.auctionapp.models.JwtResponse;
import com.internship.auctionapp.requests.UserLoginRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;
import com.internship.auctionapp.util.security.services.UserDetailsServiceCustom;
import org.springframework.stereotype.Service;

@Service
public class DefaultUserService implements UserService {
    private final UserDetailsServiceCustom userDetailsServiceCustom;

    public DefaultUserService(UserDetailsServiceCustom userDetailsServiceCustom) {
        this.userDetailsServiceCustom = userDetailsServiceCustom;
    }

    @Override
    public JwtResponse login(UserLoginRequest loginRequest) {
        return userDetailsServiceCustom.login(loginRequest);
    }

    @Override
    public String register(UserRegisterRequest registerRequest) {
        return userDetailsServiceCustom.register(registerRequest);
    }
}
