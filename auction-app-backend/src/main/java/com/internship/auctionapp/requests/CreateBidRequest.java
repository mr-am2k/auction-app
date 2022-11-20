package com.internship.auctionapp.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateBidRequest {

    private double bidPrice;

    private UUID productId;

    private UUID userId;
}
