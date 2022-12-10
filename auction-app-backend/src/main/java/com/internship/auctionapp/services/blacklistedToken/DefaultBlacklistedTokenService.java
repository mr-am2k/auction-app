package com.internship.auctionapp.services.blacklistedToken;

import com.internship.auctionapp.entities.BlacklistedTokenEntity;
import com.internship.auctionapp.repositories.blacklistedToken.BlacklistedTokenRepository;
import org.springframework.stereotype.Service;

@Service
public class DefaultBlacklistedTokenService implements BlacklistedTokenService {
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
}
