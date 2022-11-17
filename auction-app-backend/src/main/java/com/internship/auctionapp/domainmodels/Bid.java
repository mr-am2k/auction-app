package com.internship.auctionapp.domainmodels;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bid {

    private UUID id;

    private double bidPrice;

    private LocalDateTime bidCreationDateTime;

    private UUID productId;
}
