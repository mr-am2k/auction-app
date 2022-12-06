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
    private final NotificationJpaRepository notificationJpaRepository;

    private final ProductJpaRepository productJpaRepository;

    public DefaultNotificationRepository(
            NotificationJpaRepository notificationJpaRepository,
            ProductJpaRepository productJpaRepository
    ) {
        this.notificationJpaRepository = notificationJpaRepository;
        this.productJpaRepository = productJpaRepository;
    }

    @Override
    public List<Notification> getAllNotifications() {
        return notificationJpaRepository.findAll().stream()
                .map(notificationEntity -> notificationEntity.toDomainModel())
                .collect(Collectors.toList());
    }

    @Override
    public Notification createNotification(CreateNotificationRequest createNotificationRequest) {
        final ProductEntity product = productJpaRepository.findById(createNotificationRequest.getProductId()).get();

        final NotificationEntity notification = new NotificationEntity(
                createNotificationRequest.getType(),
                createNotificationRequest.getUserId(),
                product
        );

        return notificationJpaRepository.save(notification).toDomainModel();
    }

    @Override
    public Notification getNotifications(UUID userId, UUID productId) {
        return notificationJpaRepository.findTopByUserIdAndProductIdOrderByCreationDateTimeDesc(userId, productId).toDomainModel();
    }

    public List<Notification> getNotificationsByProductIdForAllUsersExcept(UUID userId, UUID productId) {
        return notificationJpaRepository.findDistinctByUserIdNotAndProductId(userId, productId).stream()
                .map(notificationEntity -> notificationEntity.toDomainModel())
                .collect(Collectors.toList());
    }
}
