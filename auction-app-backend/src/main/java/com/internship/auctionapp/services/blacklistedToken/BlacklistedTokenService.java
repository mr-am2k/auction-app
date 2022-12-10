package com.internship.auctionapp.services.blacklistedToken;

import com.internship.auctionapp.entities.BlacklistedTokenEntity;

public interface BlacklistedTokenService {
    BlacklistedTokenEntity addBlacklistedToken(String token);

    boolean checkIfTokenIsBlacklisted(String token);

    void deleteAllExpiredTokens();
}
