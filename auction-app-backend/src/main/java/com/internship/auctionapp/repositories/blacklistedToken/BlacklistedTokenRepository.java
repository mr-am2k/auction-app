package com.internship.auctionapp.repositories.blacklistedToken;

import com.internship.auctionapp.entities.BlacklistedTokenEntity;

public interface BlacklistedTokenRepository {
    BlacklistedTokenEntity addBlacklistedToken(String token);
}
