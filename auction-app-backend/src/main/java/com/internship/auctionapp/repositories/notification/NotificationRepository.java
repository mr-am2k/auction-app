package com.internship.auctionapp.repositories.notification;

import com.internship.auctionapp.entities.NotificationEntity;
import com.internship.auctionapp.requests.CreateNotificationRequest;

import java.util.List;
import java.util.UUID;

public interface NotificationRepository {
    List<NotificationEntity> getAllNotifications();

    NotificationEntity addNotification(CreateNotificationRequest createNotificationRequest);

    NotificationEntity getNotificationForUserOrderedByDate(UUID userId, UUID productId);
}
