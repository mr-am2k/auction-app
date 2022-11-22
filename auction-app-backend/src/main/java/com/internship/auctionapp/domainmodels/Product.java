package com.internship.auctionapp.domainmodels;

import com.internship.auctionapp.entities.BidEntity;
import com.internship.auctionapp.entities.ProductEntity;
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

    private List<String> imageURLs;

    private double price;

    private LocalDateTime creationDateTime;

    private LocalDateTime expirationDateTime;

    private List<Bid> bids;

    private String remainingTime;

    private UUID userId;

    public Product(UUID productId,ProductEntity productEntity, List<Bid> bids, String remainingTime){
        this.id = productId;
        this.name = productEntity.getName();
        this.description = productEntity.getDescription();
        this.imageURLs = productEntity.getImageURLs();
        this.price = productEntity.getPrice();
        this.creationDateTime = productEntity.getCreationDateTime();
        this.expirationDateTime = productEntity.getExpirationDateTime();
        this.bids = bids;
        this.remainingTime = remainingTime;
        this.userId = productEntity.getUserId();
    }
}
