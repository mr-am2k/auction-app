package com.internship.auctionapp.repositories.notification;

import com.internship.auctionapp.entities.NotificationEntity;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.repositories.product.ProductRepository;
import com.internship.auctionapp.requests.CreateNotificationRequest;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DefaultNotificationRepository implements NotificationRepository {
    private final NotificationJPARepository notificationJPARepository;

    private final ProductRepository productRepository;

    public DefaultNotificationRepository(NotificationJPARepository notificationJPARepository, ProductRepository productRepository) {
        this.notificationJPARepository = notificationJPARepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<NotificationEntity> getAllNotifications() {
        return notificationJPARepository.findAll();
    }

    @Override
    public NotificationEntity addNotification(CreateNotificationRequest createNotificationRequest) {
        ProductEntity product = productRepository.getSingleProduct(createNotificationRequest.getProductId());
        NotificationEntity notification = new NotificationEntity(createNotificationRequest.getNotificationMessage(),
                createNotificationRequest.getUserId(), product);
        return notificationJPARepository.save(notification);
    }
}
