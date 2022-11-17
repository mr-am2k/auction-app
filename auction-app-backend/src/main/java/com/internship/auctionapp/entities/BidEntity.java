package com.internship.auctionapp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.internship.auctionapp.domainmodels.Bid;
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
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Bid")
public class BidEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "bid_price", nullable = false)
    private double bidPrice;

    @Column(name = "bid_creation_date_time", nullable = false)
    private LocalDateTime bidCreationDateTime;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private ProductEntity product;

    public BidEntity(double bidPrice, ProductEntity product) {
        this.bidPrice = bidPrice;
        this.bidCreationDateTime = LocalDateTime.now();
        this.product = product;
    }

    public Bid toDomainModel() {
        Bid newBid = new Bid(this.id, this.bidPrice, this.bidCreationDateTime, this.product.getId());
        return newBid;
    }
}
