package com.internship.auctionapp.services;

import com.internship.auctionapp.models.Notification;
import com.internship.auctionapp.requests.CreateNotificationRequest;

import java.util.List;
import java.util.UUID;

public interface NotificationService {
    List<Notification> getAllNotifications();

    Notification createNotification(CreateNotificationRequest createNotificationRequest);

    List<Notification> searchNotifications(UUID userId, UUID productId);
}
