package com.internship.auctionapp.util.events;

import com.internship.auctionapp.services.blacklistedToken.AuthTokenService;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@EnableScheduling
public class BlacklistedTokensRemovalScheduler {
    private final AuthTokenService authTokenService;

    public BlacklistedTokensRemovalScheduler(AuthTokenService authTokenService) {
        this.authTokenService = authTokenService;
    }

    @Scheduled(fixedRateString = "${app.tokens_removal_interval_ms}")
    public void deleteExpiredTokens() {
        authTokenService.removeExpiredTokens();
    }
}
