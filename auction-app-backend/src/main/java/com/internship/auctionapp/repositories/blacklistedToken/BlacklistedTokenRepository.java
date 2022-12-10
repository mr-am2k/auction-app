package com.internship.auctionapp.repositories.blacklistedToken;

import com.internship.auctionapp.entities.BlacklistedTokenEntity;

import java.time.LocalDateTime;
import java.util.List;

public interface BlacklistedTokenRepository {
    BlacklistedTokenEntity addBlacklistedToken(String token);

    boolean checkIfTokenIsBlacklisted(String token);

    List<BlacklistedTokenEntity> getAllExpiredTokens(LocalDateTime startDate, LocalDateTime endDate);

    void deleteTokens(List<BlacklistedTokenEntity> expiredTokens);
}
