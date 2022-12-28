package com.internship.auctionapp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.internship.auctionapp.models.Bid;

import com.internship.auctionapp.models.BidWithProduct;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "bids")
public class BidEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "creation_date_time", nullable = false, columnDefinition = "timestamp with time zone")
    private ZonedDateTime creationDateTime = ZonedDateTime.of(LocalDateTime.now(), ZoneOffset.UTC);

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private ProductEntity product;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    public BidEntity(double price, ProductEntity product, UserEntity user) {
        this.price = price;
        this.product = product;
        this.user = user;
    }

    public Bid toDomainModel() {
        Bid bid = new Bid();

        bid.setId(this.id);
        bid.setPrice(this.price);
        bid.setCreationDateTime(this.creationDateTime);
        bid.setProductId(this.product.getId());
        bid.setUserId(this.user.getId());

        return bid;
    }

    public BidWithProduct toDomainModelWithProduct(){
        BidWithProduct bidWithProduct = new BidWithProduct();

        bidWithProduct.setId(this.id);
        bidWithProduct.setPrice(this.price);
        bidWithProduct.setCreationDateTime(this.creationDateTime);
        bidWithProduct.setProduct(this.product.toDomainModelWithoutBids());
        bidWithProduct.setUserId(this.user.getId());

        return bidWithProduct;
    }
}
