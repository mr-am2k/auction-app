package com.internship.auctionapp.services;

import com.internship.auctionapp.models.Notification;
import com.internship.auctionapp.repositories.notification.NotificationRepository;
import com.internship.auctionapp.requests.CreateNotificationRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DefaultNotificationService implements NotificationService {
    private final NotificationRepository notificationRepository;

    public DefaultNotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public List<Notification> getAllNotifications() {
        return notificationRepository.getAllNotifications();
    }

    @Override
    public Notification createNotification(CreateNotificationRequest createNotificationRequest) {
        return notificationRepository.createNotification(createNotificationRequest);
    }

    @Override
    public Notification getNotificationForUserOrderedByDate(UUID userId, UUID productId) {
        return notificationRepository.getNotificationForUserOrderedByDate(userId, productId);
    }
}
