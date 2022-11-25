package com.internship.auctionapp.util;

import com.internship.auctionapp.entities.BidEntity;
import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.repositories.bid.BidRepository;
import com.internship.auctionapp.repositories.notification.NotificationRepository;
import com.internship.auctionapp.repositories.product.ProductRepository;
import com.internship.auctionapp.requests.CreateNotificationRequest;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@EnableScheduling
public class AuctionFinishedScheduler {

    private final ProductRepository productRepository;

    public AuctionFinishedScheduler(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    @Scheduled(fixedRate = 300000L)
    public void sendYouWonNotification() {
        productRepository.createNotificationsAfterProductExpires();
    }
}
