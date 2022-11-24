package com.internship.auctionapp.requests;

import com.internship.auctionapp.util.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateNotificationRequest {

    private NotificationType notificationType;

    private UUID userId;

    private UUID productId;
}
