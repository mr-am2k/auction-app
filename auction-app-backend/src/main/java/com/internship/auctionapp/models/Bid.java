package com.internship.auctionapp.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bid {
    private UUID id;

    private double price;

    private ZonedDateTime creationDateTime;

    private UUID productId;

    private UUID userId;
}
