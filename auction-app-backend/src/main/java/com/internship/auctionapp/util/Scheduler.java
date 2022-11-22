package com.internship.auctionapp.util;

import com.internship.auctionapp.repositories.bid.BidRepository;
import com.internship.auctionapp.repositories.notification.NotificationRepository;
import com.internship.auctionapp.repositories.product.ProductRepository;
import com.internship.auctionapp.services.DefaultProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;

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


    /*@Scheduled(cron = "* * * * * *")
    public void sendYouWonNotification() throws Exception {
        final List<ProductEntity> products = productRepository.getAllProducts();
        final LocalDateTime currentTime = LocalDateTime.now();

        products.stream().forEach(product -> {
            if(product.getExpirationDateTime().truncatedTo(ChronoUnit.SECONDS).
                    isEqual(currentTime.truncatedTo(ChronoUnit.SECONDS))){

                BidEntity bid = bidRepository.getHighestBid(product.getId());

                CreateNotificationRequest notificationForWinner =
                        new CreateNotificationRequest(NotificationMessage.AUCTION_WON, bid.getUserId(), product.getId());

                notificationRepository.createNotification(notificationForWinner);
            }
        });
    }*/
}
