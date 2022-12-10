package com.internship.auctionapp.repositories.blacklistedToken;

import com.internship.auctionapp.entities.BlacklistedTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface BlacklistedTokenJpaRepository extends JpaRepository<BlacklistedTokenEntity, UUID> {
    boolean existsByBlacklistedToken(String token);

    List<BlacklistedTokenEntity> findAllByTokenExpirationTimeBetween(LocalDateTime startDate, LocalDateTime endDate);
}
