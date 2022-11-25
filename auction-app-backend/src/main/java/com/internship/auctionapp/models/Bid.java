package com.internship.auctionapp.models;

import com.internship.auctionapp.entities.BidEntity;
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

    private double bidPrice;

    private ZonedDateTime bidCreationDateTime;

    private UUID productId;

    private UUID userId;

    public Bid(BidEntity bidEntity) {
        this.id = bidEntity.getId();
        this.bidPrice = bidEntity.getPrice();
        this.bidCreationDateTime = bidEntity.getCreationDateTime();
        this.productId = bidEntity.getProduct().getId();
        this.userId = bidEntity.getUserId();
    }
}
