package com.internship.auctionapp.requests;

import com.internship.auctionapp.util.NotificationMessage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateNotificationRequest {
    private NotificationMessage notificationMessage;

    private UUID userId;

    private UUID productId;
}
