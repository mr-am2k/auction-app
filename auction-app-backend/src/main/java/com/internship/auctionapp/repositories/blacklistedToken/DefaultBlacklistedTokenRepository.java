package com.internship.auctionapp.repositories.blacklistedToken;

import com.internship.auctionapp.entities.BlacklistedTokenEntity;
import com.internship.auctionapp.util.security.jwt.JwtUtils;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class DefaultBlacklistedTokenRepository implements BlacklistedTokenRepository {
    private final BlacklistedTokenJpaRepository blacklistedTokenJpaRepository;

    private final JwtUtils jwtUtils;

    public DefaultBlacklistedTokenRepository(BlacklistedTokenJpaRepository blacklistedTokenJpaRepository, @Lazy JwtUtils jwtUtils) {
        this.blacklistedTokenJpaRepository = blacklistedTokenJpaRepository;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public BlacklistedTokenEntity addBlacklistedToken(String token) {
        BlacklistedTokenEntity blacklistedToken = new BlacklistedTokenEntity();

        blacklistedToken.setBlacklistedToken(token);
        blacklistedToken.setTokenExpirationTime(jwtUtils.getTokenExpirationTime(token));

        return blacklistedTokenJpaRepository.save(blacklistedToken);
    }

    @Override
    public boolean checkIfTokenIsBlacklisted(String token) {
        return blacklistedTokenJpaRepository.existsByBlacklistedToken(token);
    }

    @Override
    public List<BlacklistedTokenEntity> getAllExpiredTokens(LocalDateTime startDate, LocalDateTime endDate) {
        return blacklistedTokenJpaRepository.findAllByTokenExpirationTimeBetween(startDate, endDate);
    }

    @Override
    public void deleteTokens(List<BlacklistedTokenEntity> expiredTokens) {
        blacklistedTokenJpaRepository.deleteAll(expiredTokens);
    }
}
