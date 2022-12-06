package com.internship.auctionapp.repositories.user;

import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.requests.UserRegisterRequest;

import java.util.List;
import java.util.UUID;

public interface UserRepository {
    UserEntity findByEmail(String email);

    Boolean existsByEmail(String email);

    UserEntity addUser(UserRegisterRequest userRegisterRequest);

    List<User> getUsers();

    User getUserById(UUID id);
}
