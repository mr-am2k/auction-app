package com.internship.auctionapp.repositories.bid;

import com.internship.auctionapp.models.Bid;

import java.util.List;
import java.util.UUID;

public interface BidRepository {
    Bid addBid(UUID productId, double price, UUID userId);

    List<Bid> getAllBids();

    void deleteBid(UUID id);

    List<Double> getHighestBidPrice(UUID productId);
}
