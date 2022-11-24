package com.internship.auctionapp.repositories.notification;

import com.internship.auctionapp.models.Notification;
import com.internship.auctionapp.entities.NotificationEntity;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.repositories.product.ProductJPARepository;
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
    private final NotificationJPARepository notificationJPARepository;

    private final ProductJPARepository productJPARepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultNotificationRepository.class);

    public DefaultNotificationRepository(
            NotificationJPARepository notificationJPARepository,
            ProductJPARepository productJPARepository
    ) {
        this.notificationJPARepository = notificationJPARepository;
        this.productJPARepository = productJPARepository;
    }

    @Override
    public List<Notification> getAllNotifications() {
        List<Notification> notifications = notificationJPARepository.findAll().stream()
                .map(notificationEntity -> notificationEntity.toDomainModel())
                .collect(Collectors.toList());

        LOGGER.info("Fetched all notifications={}", notifications);
        return notifications;
    }

    @Override
    public Notification createNotification(CreateNotificationRequest createNotificationRequest) {
        ProductEntity product = productJPARepository.findById(createNotificationRequest.getProductId()).get();
        NotificationEntity notification = new NotificationEntity(
                createNotificationRequest.getNotificationMessage(),
                createNotificationRequest.getUserId(),
                product
        );

        notificationJPARepository.save(notification).toDomainModel();
        LOGGER.info("Successfully saved notification={}", notification);

        if (notification.getNotificationType() == NotificationType.HIGHEST_BID_PLACED) {
            getNotificationsByProductIdForAllUsersExcept(createNotificationRequest.getUserId(), product.getId()).stream()
                    .forEach(notificationEntity -> {
                        Notification latestNotificationForUser = notificationJPARepository.findTopByUserIdAndProductIdOrderByCreationDateTimeDesc(
                                notificationEntity.getUserId(),
                                product.getId()
                        ).toDomainModel();

                        if (latestNotificationForUser.getNotificationMessage().equals(String.valueOf(NotificationType.HIGHEST_BID_PLACED))) {
                            NotificationEntity outBidded = new NotificationEntity(NotificationType.OUTBIDDED, notificationEntity.getUserId(), product);
                            notificationJPARepository.save(outBidded);
                            LOGGER.info("Successfully saved notification={}", outBidded, " for user with id={}",
                                    outBidded.getUserId(), "that says that he is outbidded");
                        }
                    });
        }

        return notification.toDomainModel();
    }

    @Override
    public Notification getNotifications(UUID userId, UUID productId) {
        Notification latestNotification = notificationJPARepository.findTopByUserIdAndProductIdOrderByCreationDateTimeDesc(userId, productId).toDomainModel();

        LOGGER.info("Fetched latest notification={}", latestNotification, " for user={}", userId, " and product={}", productId);
        return latestNotification;
    }

    public List<Notification> getNotificationsByProductIdForAllUsersExcept(UUID userId, UUID productId) {
        List<Notification> notificationsForAllUsersExceptOne =  notificationJPARepository.
                findDistinctByUserIdNotAndProductId(userId, productId).stream()
                .map(notificationEntity -> notificationEntity.toDomainModel())
                .collect(Collectors.toList());

        LOGGER.info("Fetched notifications={}", notificationsForAllUsersExceptOne, " for all users except user={}", userId);

        return notificationsForAllUsersExceptOne;
    }
}
