package com.internship.auctionapp.repositories.notification;

import com.internship.auctionapp.domainmodels.Notification;
import com.internship.auctionapp.requests.CreateNotificationRequest;

import java.util.List;
import java.util.UUID;

public interface NotificationRepository {
    List<Notification> getAllNotifications();

    Notification createNotification(CreateNotificationRequest createNotificationRequest);

    Notification getNotificationForUserOrderedByDate(UUID userId, UUID productId);
}
