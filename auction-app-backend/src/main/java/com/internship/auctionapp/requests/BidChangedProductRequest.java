package com.internship.auctionapp.requests;

import com.internship.auctionapp.models.Product;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BidChangedProductRequest {
    private Product product;

    private Double highestBidPrice;
}
