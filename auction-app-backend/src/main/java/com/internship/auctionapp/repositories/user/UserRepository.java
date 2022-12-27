package com.internship.auctionapp.repositories.user;

import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.requests.UpdateCardRequest;
import com.internship.auctionapp.requests.UpdateUserRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;

import java.util.List;
import java.util.UUID;

public interface UserRepository {
    UserEntity findByUsername(String username);

    Boolean existsByEmail(String email);

    UserEntity registerUser(UserRegisterRequest userRegisterRequest);

    List<User> getUsers();

    User getSingleUser(UUID id);

    User updateUser(UUID id, UpdateUserRequest updateUserRequest, UpdateCardRequest updateCardRequest);

    void deactivate(String username);
}
