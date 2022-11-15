package com.internship.auctionapp.DAO;

import java.util.UUID;

public class BidDAO {

    private double bidPrice;

    private UUID productId;
    
    public double getBidPrice() {
        return bidPrice;
    }

    public void setBidPrice(double bidPrice) {
        this.bidPrice = bidPrice;
    }

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(UUID productId) {
        this.productId = productId;
    }
}
