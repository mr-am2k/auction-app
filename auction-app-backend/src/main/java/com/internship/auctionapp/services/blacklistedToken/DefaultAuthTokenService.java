package com.internship.auctionapp.services.blacklistedToken;

import com.internship.auctionapp.entities.AuthTokenEntity;
import com.internship.auctionapp.repositories.blacklistedToken.AuthTokenRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
public class DefaultAuthTokenService implements AuthTokenService {
    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultAuthTokenService.class);
    @Value("${app.jwtExpirationMs}")
    private Long jwtExpiration;

    private final AuthTokenRepository authTokenRepository;

    public DefaultAuthTokenService(AuthTokenRepository authTokenRepository) {
        this.authTokenRepository = authTokenRepository;
    }

    @Override
    public AuthTokenEntity addToken(String token, boolean blacklisted) {
        AuthTokenEntity authToken = authTokenRepository.addToken(token, blacklisted);

        LOGGER.info("Successfully added new token: {}", authToken);

        return authToken;
    }

    @Override
    public boolean checkIfBlacklisted(String token) {
        boolean blacklisted = authTokenRepository.checkIfBlacklisted(token);

        LOGGER.info("Token: {} is blacklisted: {}", token, blacklisted);

        return blacklisted;
    }

    @Override
    public void removeExpiredTokens() {
        final LocalDateTime startDate = LocalDateTime.now().minus(Duration.ofMillis(jwtExpiration));

        final LocalDateTime endDate = LocalDateTime.now();

        authTokenRepository.removeExpiredTokens(startDate, endDate);
    }
}
