package com.internship.auctionapp.repositories.blacklistedToken;

import com.internship.auctionapp.entities.BlacklistedTokenEntity;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public class DefaultBlacklistedTokenRepository implements BlacklistedTokenRepository{
    private final BlacklistedTokenJpaRepository blacklistedTokenJpaRepository;

    public DefaultBlacklistedTokenRepository(BlacklistedTokenJpaRepository blacklistedTokenJpaRepository) {
        this.blacklistedTokenJpaRepository = blacklistedTokenJpaRepository;
    }

    @Override
    public BlacklistedTokenEntity addBlacklistedToken(String token) {
        BlacklistedTokenEntity blacklistedToken = new BlacklistedTokenEntity();

        blacklistedToken.setBlacklistedToken(token);
        blacklistedToken.setBlacklistedTime(LocalDateTime.now());

        return blacklistedTokenJpaRepository.save(blacklistedToken);
    }
}
