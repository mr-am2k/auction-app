package com.internship.auctionapp.domainmodels;

import com.internship.auctionapp.util.NotificationMessage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;



@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    private UUID id;

    private LocalDateTime creationDateTime;

    private NotificationMessage notificationMessage;

    private UUID userId;

    private UUID productId;
}
