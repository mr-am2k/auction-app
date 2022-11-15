package com.internship.auctionapp.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "bid_price", nullable = false)
    private double bidPrice;

    @Column(name = "bid_creation_date_time", nullable = false)
    private LocalDateTime bidCreationDateTime;

    public Bid(double bidPrice, LocalDateTime bidCreationDateTime) {
        this.bidPrice = bidPrice;
        this.bidCreationDateTime = bidCreationDateTime;
    }
}
