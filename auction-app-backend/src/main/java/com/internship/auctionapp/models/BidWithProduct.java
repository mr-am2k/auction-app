package com.internship.auctionapp.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
public class BidWithProduct {
    private UUID id;

    private double price;

    private ZonedDateTime creationDateTime;

    private ProductWithoutBid product;

    private UUID userId;
}
