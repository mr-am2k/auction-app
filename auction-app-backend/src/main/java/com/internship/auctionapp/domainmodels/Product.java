package com.internship.auctionapp.domainmodels;

import com.internship.auctionapp.entities.BidEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    private UUID id;

    private String name;

    private String description;

    private List<String> imageURL;

    private double price;

    private LocalDateTime creationDateTime;

    private LocalDateTime expirationDateTime;

    private List<Bid> bids;

    private String remainingTime;
}
