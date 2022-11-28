package com.internship.auctionapp.repositories.notification;

import com.internship.auctionapp.models.Notification;
import com.internship.auctionapp.entities.NotificationEntity;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.repositories.product.ProductJpaRepository;
import com.internship.auctionapp.requests.CreateNotificationRequest;
import com.internship.auctionapp.util.NotificationType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class DefaultNotificationRepository implements NotificationRepository {

    private final NotificationJpaRepository notificationJPARepository;

    private final ProductJpaRepository productJPARepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultNotificationRepository.class);

    public DefaultNotificationRepository(
            NotificationJpaRepository notificationJPARepository,
            ProductJpaRepository productJPARepository
    ) {
        this.notificationJPARepository = notificationJPARepository;
        this.productJPARepository = productJPARepository;
    }

    @Override
    public List<Notification> getAllNotifications() {
        final List<Notification> notifications = notificationJPARepository.findAll().stream()
                .map(notificationEntity -> notificationEntity.toDomainModel())
                .collect(Collectors.toList());

        LOGGER.info("Fetched all notifications={}", notifications);

        return notifications;
    }

    @Override
    public Notification createNotification(CreateNotificationRequest createNotificationRequest) {
        final ProductEntity product = productJPARepository.findById(createNotificationRequest.getProductId()).get();

        final NotificationEntity notification = new NotificationEntity(
                createNotificationRequest.getNotificationType(),
                createNotificationRequest.getUserId(),
                product
        );

        notificationJPARepository.save(notification).toDomainModel();

        LOGGER.info("Successfully saved notification={}", notification);

        if (notification.getNotificationType() == NotificationType.HIGHEST_BID_PLACED) {
            getNotificationsByProductIdForAllUsersExcept(createNotificationRequest.getUserId(), product.getId()).stream()
                    .forEach(notificationEntity -> {
                        final Notification latestNotificationForUser = notificationJPARepository.findTopByUserIdAndProductIdOrderByCreationDateTimeDesc(
                                notificationEntity.getUserId(),
                                product.getId()
                        ).toDomainModel();

                        if (latestNotificationForUser.getNotificationType().equals(String.valueOf(NotificationType.HIGHEST_BID_PLACED))) {
                            final NotificationEntity outBidded = new NotificationEntity(NotificationType.OUTBIDDED, notificationEntity.getUserId(), product);

                            notificationJPARepository.save(outBidded);

                            LOGGER.info("Successfully saved notification={} for user with user_id={} that says he is outbidded.",
                                    outBidded, outBidded.getUserId());
                        }
                    });
        }

        return notification.toDomainModel();
    }

    @Override
    public Notification getNotifications(UUID userId, UUID productId) {
        final Notification latestNotification = notificationJPARepository.findTopByUserIdAndProductIdOrderByCreationDateTimeDesc(userId, productId).toDomainModel();

        LOGGER.info("Fetched latest notification={} for user with user_id={} and product with product_id={}", latestNotification, userId, productId);

        return latestNotification;
    }

    public List<Notification> getNotificationsByProductIdForAllUsersExcept(UUID userId, UUID productId) {
        final List<Notification> notificationsForAllUsersExceptOne = notificationJPARepository.findDistinctByUserIdNotAndProductId(userId, productId).stream()
                .map(notificationEntity -> notificationEntity.toDomainModel())
                .collect(Collectors.toList());

        LOGGER.info("Fetched notifications={} for all users except user with userId={}", notificationsForAllUsersExceptOne, userId);

        return notificationsForAllUsersExceptOne;
    }
}
