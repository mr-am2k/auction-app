package com.internship.auctionapp.repositories.user;

import com.internship.auctionapp.entities.UserEntity;

public interface UserRepository {
    UserEntity findByEmail(String email);

    Boolean existsByEmail(String email);
}
