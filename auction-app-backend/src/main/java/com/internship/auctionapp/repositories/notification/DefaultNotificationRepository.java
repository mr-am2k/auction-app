package com.internship.auctionapp.repositories.notification;

import com.internship.auctionapp.models.Notification;
import com.internship.auctionapp.entities.NotificationEntity;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.repositories.product.ProductJpaRepository;
import com.internship.auctionapp.requests.CreateNotificationRequest;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class DefaultNotificationRepository implements NotificationRepository {

    private final NotificationJpaRepository notificationJPARepository;

    private final ProductJpaRepository productJPARepository;

    public DefaultNotificationRepository(
            NotificationJpaRepository notificationJPARepository,
            ProductJpaRepository productJPARepository
    ) {
        this.notificationJPARepository = notificationJPARepository;
        this.productJPARepository = productJPARepository;
    }

    @Override
    public List<Notification> getAllNotifications() {
        return notificationJPARepository.findAll().stream()
                .map(notificationEntity -> notificationEntity.toDomainModel())
                .collect(Collectors.toList());
    }

    @Override
    public Notification createNotification(CreateNotificationRequest createNotificationRequest) {
        final ProductEntity product = productJPARepository.findById(createNotificationRequest.getProductId()).get();

        final NotificationEntity notification = new NotificationEntity(
                createNotificationRequest.getNotificationType(),
                createNotificationRequest.getUserId(),
                product
        );

        return notificationJPARepository.save(notification).toDomainModel();
    }

    @Override
    public Notification getNotifications(UUID userId, UUID productId) {
        return notificationJPARepository.findTopByUserIdAndProductIdOrderByCreationDateTimeDesc(userId, productId).toDomainModel();
    }

    public List<Notification> getNotificationsByProductIdForAllUsersExcept(UUID userId, UUID productId) {
        return notificationJPARepository.findDistinctByUserIdNotAndProductId(userId, productId).stream()
                .map(notificationEntity -> notificationEntity.toDomainModel())
                .collect(Collectors.toList());
    }
}
