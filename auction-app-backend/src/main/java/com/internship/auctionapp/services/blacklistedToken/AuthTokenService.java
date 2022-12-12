package com.internship.auctionapp.services.blacklistedToken;

import com.internship.auctionapp.entities.AuthTokenEntity;

public interface AuthTokenService {
    AuthTokenEntity addToken(String token, boolean blacklisted);

    boolean checkIfBlacklisted(String token);

    void removeExpiredTokens();
}
