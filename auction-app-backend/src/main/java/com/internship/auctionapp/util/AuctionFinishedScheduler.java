package com.internship.auctionapp.util;

import com.internship.auctionapp.repositories.product.ProductRepository;
import com.internship.auctionapp.services.DefaultProductService;
import com.internship.auctionapp.services.ProductService;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@EnableScheduling
public class AuctionFinishedScheduler {

    private final ProductService productService;

    public AuctionFinishedScheduler(ProductService productService){
        this.productService = productService;
    }

    @Scheduled(fixedRate = 300000L)
    public void sendYouWonNotification() {
        productService.createNotificationsAfterProductExpires();
    }
}
