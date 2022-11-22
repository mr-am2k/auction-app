package com.internship.auctionapp.domainmodels;

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

    private String notificationMessage;

    private UUID userId;

    private UUID productId;
}
