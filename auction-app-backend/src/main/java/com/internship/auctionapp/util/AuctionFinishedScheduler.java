package com.internship.auctionapp.util;

import com.internship.auctionapp.services.product.ProductService;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@EnableScheduling
public class AuctionFinishedScheduler {
    private final ProductService productService;

    public AuctionFinishedScheduler(ProductService productService) {
        this.productService = productService;
    }

    @Scheduled(fixedRateString = "${scheduler.auction_finished_delay}")
    public void sendNotifications() {
        productService.createNotificationsAfterProductExpires();
    }
}
