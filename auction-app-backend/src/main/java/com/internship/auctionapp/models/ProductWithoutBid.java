package com.internship.auctionapp.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class ProductWithoutBid {
    private UUID id;

    private String name;

    private String description;

    private List<String> imageURLs;

    private double startPrice;

    private ZonedDateTime creationDateTime;

    private ZonedDateTime expirationDateTime;

    private List<Bid> bids;

    private String remainingTime;

    private Integer numberOfBids;

    private User user;

    private Category category;

    private UUID highestBidder;

    private Double highestBidPrice;
}
