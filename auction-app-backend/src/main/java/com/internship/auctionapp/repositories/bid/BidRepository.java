package com.internship.auctionapp.repositories.bid;

import com.internship.auctionapp.domainmodels.Bid;

import java.util.List;
import java.util.UUID;

public interface BidRepository {
    Bid addBid(UUID productId, double price, UUID userId);

    List<Bid> getAllBids();

    void deleteBid(UUID id);

    double getHighestBidPrice(UUID productId);

    Bid getHighestBid(UUID productId);
}
