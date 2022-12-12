package com.internship.auctionapp.repositories.blacklistedToken;

import com.internship.auctionapp.entities.AuthTokenEntity;
import com.internship.auctionapp.util.security.jwt.JwtUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class DefaultAuthTokenRepository implements AuthTokenRepository {
    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultAuthTokenRepository.class);

    private final AuthTokenJpaRepository authTokenJpaRepository;

    private final JwtUtils jwtUtils;

    public DefaultAuthTokenRepository(AuthTokenJpaRepository authTokenJpaRepository, @Lazy JwtUtils jwtUtils) {
        this.authTokenJpaRepository = authTokenJpaRepository;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public AuthTokenEntity addToken(String token, boolean blacklisted) {
        AuthTokenEntity authToken = new AuthTokenEntity();

        authToken.setToken(token);
        authToken.setTokenExpirationTime(jwtUtils.getTokenExpirationTime(token));

        if(blacklisted){
            authToken.setBlacklisted(true);
        }

        return authTokenJpaRepository.save(authToken);
    }

    @Override
    public boolean checkIfBlacklisted(String token) {
        return authTokenJpaRepository.existsByTokenAndBlacklisted(token, true);
    }

    @Override
    public void removeExpiredTokens(LocalDateTime startDate, LocalDateTime endDate) {
        List<AuthTokenEntity> tokens = authTokenJpaRepository.findAllByTokenExpirationTimeBetween(startDate, endDate);

        authTokenJpaRepository.deleteAll(tokens);
    }
}
