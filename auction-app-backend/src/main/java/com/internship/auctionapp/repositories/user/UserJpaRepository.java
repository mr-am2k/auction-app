package com.internship.auctionapp.repositories.user;

import com.internship.auctionapp.entities.UserEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserJpaRepository extends JpaRepository<UserEntity, UUID> {
    UserEntity findByUsername(String username);

    Boolean existsByEmail(String email);
}
