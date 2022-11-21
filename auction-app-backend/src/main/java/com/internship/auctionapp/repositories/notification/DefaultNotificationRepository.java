package com.internship.auctionapp.repositories.notification;

import com.internship.auctionapp.entities.NotificationEntity;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.repositories.product.ProductRepository;
import com.internship.auctionapp.requests.CreateNotificationRequest;
import com.internship.auctionapp.services.DefaultProductService;
import com.internship.auctionapp.util.NotificationMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.InvalidDataAccessResourceUsageException;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Repository
public class DefaultNotificationRepository implements NotificationRepository {
    private final NotificationJPARepository notificationJPARepository;

    private final ProductRepository productRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultProductService.class);

    public DefaultNotificationRepository(NotificationJPARepository notificationJPARepository, ProductRepository productRepository) {
        this.notificationJPARepository = notificationJPARepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<NotificationEntity> getAllNotifications() {
        return notificationJPARepository.findAll();
    }

    @Override
    @Transactional
    public NotificationEntity addNotification(CreateNotificationRequest createNotificationRequest) {
        ProductEntity product = productRepository.getSingleProduct(createNotificationRequest.getProductId());
        NotificationEntity newNotification = new NotificationEntity(createNotificationRequest.getNotificationMessage(),
                createNotificationRequest.getUserId(), product);

        notificationJPARepository.save(newNotification);

        try {
            if (newNotification.getNotificationMessage() == NotificationMessage.HIGHEST_BIDDER) {
                getNotificationEntityByUserIdAndProductId(product.getId(), createNotificationRequest.getUserId()).stream()
                        .forEach((notification) -> {
                            if (notification.getUserId() != createNotificationRequest.getUserId()) {
                                NotificationEntity outbiddedNotification = (new NotificationEntity(NotificationMessage.OUTBIDDED,
                                        notification.getUserId(), notification.getProduct()));
                                notificationJPARepository.save(outbiddedNotification);
                            }
                        });
            }
        } catch (InvalidDataAccessResourceUsageException e) {
            throw new InvalidDataAccessResourceUsageException(e.getMessage());
        }


        return newNotification;
    }

    private List<NotificationEntity> getNotificationEntityByUserIdAndProductId(UUID productId, UUID userId) {
        return notificationJPARepository.getNotificationEntityByUserIdAndProductId(productId, userId);
    }
}
