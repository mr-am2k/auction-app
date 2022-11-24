package com.internship.auctionapp.models;

import com.internship.auctionapp.entities.NotificationEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    private UUID id;

    private ZonedDateTime creationDateTime;

    private String notificationType;

    private UUID userId;

    private UUID productId;

    public Notification(NotificationEntity notificationEntity){
        this.id = notificationEntity.getId();
        this.creationDateTime = notificationEntity.getCreationDateTime();
        this.notificationType = String.valueOf(notificationEntity.getNotificationType());
        this.userId = notificationEntity.getUserId();
        this.productId = notificationEntity.getProduct().getId();
    }
}
