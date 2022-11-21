package com.internship.auctionapp.services;

import com.internship.auctionapp.domainmodels.Notification;
import com.internship.auctionapp.requests.CreateNotificationRequest;

import java.util.List;
import java.util.UUID;

public interface NotificationService {
    List<Notification> getAllNotifications();

    Notification addNotification(CreateNotificationRequest createNotificationRequest);

    Notification getNotificationForUserOrderedByDate(UUID userId, UUID productId);
}
