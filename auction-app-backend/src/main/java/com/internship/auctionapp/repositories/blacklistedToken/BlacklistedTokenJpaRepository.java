package com.internship.auctionapp.repositories.blacklistedToken;

import com.internship.auctionapp.entities.BlacklistedTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BlacklistedTokenJpaRepository extends JpaRepository<BlacklistedTokenEntity, UUID> {
}
