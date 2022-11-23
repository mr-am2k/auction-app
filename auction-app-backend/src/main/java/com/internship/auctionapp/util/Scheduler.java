package com.internship.auctionapp.util;

import com.internship.auctionapp.entities.BidEntity;
import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.repositories.bid.BidRepository;
import com.internship.auctionapp.repositories.notification.NotificationRepository;
import com.internship.auctionapp.repositories.product.ProductRepository;
import com.internship.auctionapp.requests.CreateNotificationRequest;
import com.internship.auctionapp.services.DefaultProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@EnableScheduling
public class Scheduler {

    private final ProductRepository productRepository;

    private final BidRepository bidRepository;

    private final NotificationRepository notificationRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultProductService.class);

    public Scheduler(ProductRepository productRepository, BidRepository bidRepository, NotificationRepository notificationRepository) {
        this.productRepository = productRepository;
        this.bidRepository = bidRepository;
        this.notificationRepository = notificationRepository;
    }


    @Scheduled(fixedRate = 300000L)
    public void sendYouWonNotification() throws Exception {
        LocalDateTime currentTime = LocalDateTime.now();
        List<Product> products = productRepository.getProductsBetweenTwoDates(currentTime.minusMinutes(5), currentTime);
        if (products.isEmpty()) {
            return;
        }
        products.stream()
                .forEach(product -> {
                    BidEntity bid = bidRepository.getHighestBid(product.getId());

                    CreateNotificationRequest notificationForWinner =
                            new CreateNotificationRequest(NotificationMessage.AUCTION_WON, bid.getUserId(), product.getId());

                    notificationRepository.createNotification(notificationForWinner);
                });
    }
}
