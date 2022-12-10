package com.internship.auctionapp.repositories.blacklistedToken;

import com.internship.auctionapp.entities.BlacklistedTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface BlacklistedTokenJpaRepository extends JpaRepository<BlacklistedTokenEntity, UUID> {
    boolean existsByBlacklistedToken(@Param("token") String token);
}
