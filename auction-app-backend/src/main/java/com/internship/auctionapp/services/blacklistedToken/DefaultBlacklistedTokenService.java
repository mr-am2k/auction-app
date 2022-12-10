package com.internship.auctionapp.services.blacklistedToken;

import com.internship.auctionapp.entities.BlacklistedTokenEntity;
import com.internship.auctionapp.repositories.blacklistedToken.BlacklistedTokenRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DefaultBlacklistedTokenService implements BlacklistedTokenService {
    @Value("${app.jwtExpirationMs}")
    private Long jwtExpiration;

    private final BlacklistedTokenRepository blacklistedTokenRepository;

    public DefaultBlacklistedTokenService(BlacklistedTokenRepository blacklistedTokenRepository) {
        this.blacklistedTokenRepository = blacklistedTokenRepository;
    }

    @Override
    public BlacklistedTokenEntity addBlacklistedToken(String token) {
        return blacklistedTokenRepository.addBlacklistedToken(token);
    }

    @Override
    public boolean checkIfTokenIsBlacklisted(String token) {
        return blacklistedTokenRepository.checkIfTokenIsBlacklisted(token);
    }

    @Override
    public void deleteAllExpiredTokens() {
        final LocalDateTime startDate = LocalDateTime.now().minus(Duration.ofMillis(jwtExpiration));

        final LocalDateTime endDate = LocalDateTime.now();

        List<BlacklistedTokenEntity> expiredTokens = blacklistedTokenRepository.getAllExpiredTokens(startDate, endDate);

        blacklistedTokenRepository.deleteTokens(expiredTokens);
    }
}
