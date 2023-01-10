package com.internship.auctionapp.repositories.user;

import com.internship.auctionapp.models.Address;
import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.requests.CreateCreditCardRequest;
import com.internship.auctionapp.requests.UpdateUserRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;

import java.util.List;
import java.util.UUID;

public interface UserRepository {
    UserEntity findByUsername(String username);

    Boolean existsByEmail(String email);

    UserEntity registerUser(UserRegisterRequest userRegisterRequest);

    List<User> getUsers();

    User getUser(UUID userId);

    User updateUser(
            String username,
            UpdateUserRequest updateUserRequest,
            CreateCreditCardRequest createCreditCardRequest,
            Address address
    );

    void deactivate(String username);
}
