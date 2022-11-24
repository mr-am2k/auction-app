package com.internship.auctionapp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.internship.auctionapp.models.Bid;
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

    @Column(name = "creation_date_time", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private ZonedDateTime creationDateTime = ZonedDateTime.of(LocalDateTime.now(), ZoneOffset.UTC);

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private ProductEntity product;

    private UUID userId;

    public BidEntity(double price, ProductEntity product, UUID userId) {
        this.price = price;
        this.product = product;
        this.userId = userId;
    }

    public Bid toDomainModel() {
        BidEntity bidEntity = new BidEntity(
                this.id,
                this.price,
                this.creationDateTime,
                this.product,
                this.getUserId()
        );

        return new Bid(bidEntity);
    }
}
