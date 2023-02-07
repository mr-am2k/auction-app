package com.internship.auctionapp.services.user;

import com.internship.auctionapp.models.AuthResponse;
import com.internship.auctionapp.models.LoginResponse;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.requests.CheckIfUserExistsRequest;
import com.internship.auctionapp.requests.CreateAddressRequest;
import com.internship.auctionapp.requests.CreateCreditCardRequest;
import com.internship.auctionapp.requests.UpdateUserDataRequest;
import com.internship.auctionapp.requests.UpdateUserRequest;
import com.internship.auctionapp.requests.UserLoginRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;
import com.internship.auctionapp.requests.UserSocialLoginRequest;

import java.util.UUID;

public interface UserService {
    LoginResponse login(UserLoginRequest loginRequest);

    User register(UserRegisterRequest registerRequest);

    void logout(String token);

    AuthResponse refreshToken(String username);

    User getUser(UUID userId);

    User updateUser(UpdateUserDataRequest updateUserDataRequest, String username);

    void deactivate(String username);

    boolean checkIfUserExists(CheckIfUserExistsRequest checkIfUserExistsRequest);

    LoginResponse socialLogin(UserSocialLoginRequest userSocialLoginRequest);
}
