package com.internship.auctionapp.repositories.bid;

import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.requests.CreateBidRequest;

import java.util.List;
import java.util.UUID;

public interface BidRepository {
    Bid addBid(CreateBidRequest createBidRequest);

    List<Bid> getAllBids();

    Bid getHighestBid(UUID productId);

    List<Bid> getUserBids(UUID userId);
}
