package com.internship.auctionapp.repositories.blacklistedToken;

import com.internship.auctionapp.entities.AuthTokenEntity;

import java.time.LocalDateTime;

public interface AuthTokenRepository {
    AuthTokenEntity addToken(String token, boolean blacklisted);

    boolean checkIfBlacklisted(String token);

    void removeExpiredTokens(LocalDateTime startDate, LocalDateTime endDate);
}
