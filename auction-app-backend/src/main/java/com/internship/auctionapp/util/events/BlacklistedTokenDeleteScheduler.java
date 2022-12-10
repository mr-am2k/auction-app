package com.internship.auctionapp.util.events;

import com.internship.auctionapp.services.blacklistedToken.BlacklistedTokenService;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@EnableScheduling
public class BlacklistedTokenDeleteScheduler {
    private final BlacklistedTokenService blacklistedTokenService;

    public BlacklistedTokenDeleteScheduler(BlacklistedTokenService blacklistedTokenService) {
        this.blacklistedTokenService = blacklistedTokenService;
    }

    @Scheduled(fixedRateString = "${app.jwtExpirationMs}")
    public void deleteExpiredTokens(){
        blacklistedTokenService.deleteAllExpiredTokens();
    }
}
