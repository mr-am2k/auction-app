package com.internship.auctionapp.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    private UUID id;

    private ZonedDateTime creationDateTime;

    private String type;

    private UUID userId;

    private UUID productId;
}
