package com.internship.auctionapp.repositories.blacklistedToken;

import com.internship.auctionapp.entities.AuthTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;


import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface AuthTokenJpaRepository extends JpaRepository<AuthTokenEntity, UUID> {
    boolean existsByTokenAndBlacklisted(String token, boolean blacklisted);

    List<AuthTokenEntity> findAllByTokenExpirationTimeBetween(LocalDateTime startDate, LocalDateTime endDate);
}
