package com.internship.auctionapp.services.notification;

import com.internship.auctionapp.models.Notification;
import com.internship.auctionapp.repositories.notification.NotificationRepository;
import com.internship.auctionapp.requests.CreateNotificationRequest;
import com.internship.auctionapp.util.NotificationType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DefaultNotificationService implements NotificationService {
    private final NotificationRepository notificationRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultNotificationService.class);

    public DefaultNotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public List<Notification> getAllNotifications() {
        List<Notification> notifications = notificationRepository.getAllNotifications();

        LOGGER.info("Fetched all notifications={}", notifications);

        return notifications;
    }

    @Override
    public Notification createNotification(CreateNotificationRequest createNotificationRequest) {
        final Notification savedNotification = notificationRepository.createNotification(createNotificationRequest);

        LOGGER.info("Successfully saved notification={}", savedNotification);

        if (NotificationType.valueOf(savedNotification.getType()) == NotificationType.HIGHEST_BID_PLACED) {
            notificationRepository.getNotificationsByProductIdForAllUsersExcept(
                            savedNotification.getUserId(),
                            savedNotification.getProductId()
                    ).stream()
                    .forEach(notification -> {
                        final Notification latestUserNotifications = notificationRepository.getNotifications(
                                notification.getUserId(),
                                notification.getProductId()
                        );

                        if (NotificationType.valueOf(latestUserNotifications.getType()) == NotificationType.HIGHEST_BID_PLACED) {
                            final CreateNotificationRequest outbiddedNotificationRequest = new CreateNotificationRequest(
                                    NotificationType.OUTBIDDED,
                                    notification.getUserId(),
                                    notification.getProductId()
                            );

                            final Notification outbiddedNotification = notificationRepository.createNotification(outbiddedNotificationRequest);

                            LOGGER.info("Successfully saved notification with type={} for user with user_id={}",
                                    outbiddedNotification.getType(), outbiddedNotification.getUserId());
                        }
                    });
        }

        return savedNotification;
    }

    @Override
    public Notification getNotifications(UUID userId, UUID productId) {
        Notification latestNotification = notificationRepository.getNotifications(userId, productId);

        LOGGER.info("Fetched latest notification={} for user with user_id={} and product with product_id={}", latestNotification, userId, productId);

        return latestNotification;
    }
}
