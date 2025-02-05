package com.internship.auctionapp.models;

import com.internship.auctionapp.entities.ProductEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
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

    private double startPrice;

    private ZonedDateTime creationDateTime;

    private ZonedDateTime expirationDateTime;

    private List<Bid> bids;

    private String remainingTime;

    private User user;

    private Category category;

    private Category subcategory;

    private Address address;

    private CreditCard creditCard;

    private UUID highestBidder;

    private Double highestBidPrice;

    private boolean paid;

    public Product(UUID productId, ProductEntity productEntity, List<Bid> bids, String remainingTime) {
        this.id = productId;
        this.name = productEntity.getName();
        this.description = productEntity.getDescription();
        this.imageURLs = productEntity.getImageURLs();
        this.startPrice = productEntity.getStartPrice();
        this.creationDateTime = productEntity.getCreationDateTime();
        this.expirationDateTime = productEntity.getExpirationDateTime();
        this.bids = bids;
        this.remainingTime = remainingTime;
        this.user = productEntity.getUser().toDomainModel();
        this.category = productEntity.getCategory().toDomainModel();
        this.subcategory = productEntity.getSubcategory().toDomainModel();
        this.address = productEntity.getAddress();
        this.creditCard = productEntity.getCreditCard().toDomainModel();
        this.highestBidder = productEntity.getHighestBidder();
        this.highestBidPrice = productEntity.getHighestBidPrice();
        this.paid = productEntity.isPaid();
    }
}
