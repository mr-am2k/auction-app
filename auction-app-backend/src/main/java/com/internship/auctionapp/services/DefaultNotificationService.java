package com.internship.auctionapp.services;

import com.internship.auctionapp.domainmodels.Notification;
import com.internship.auctionapp.repositories.notification.NotificationRepository;
import com.internship.auctionapp.requests.CreateNotificationRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DefaultNotificationService implements NotificationService {
    private final NotificationRepository notificationRepository;

    public DefaultNotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public List<Notification> getAllNotifications() {
        return notificationRepository.getAllNotifications().stream()
                .map(notificationEntity -> notificationEntity.toDomainModel())
                .collect(Collectors.toList());
    }

    @Override
    public Notification addNotification(CreateNotificationRequest createNotificationRequest) {
        return notificationRepository.addNotification(createNotificationRequest).toDomainModel();
    }

    @Override
    public Notification getNotificationForUserOrderedByDate(UUID userId, UUID productId) {
        return notificationRepository.getNotificationForUserOrderedByDate(userId, productId).toDomainModel();
    }
}
