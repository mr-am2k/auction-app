package com.internship.auctionapp.services;

import com.internship.auctionapp.requests.CreateBidRequest;
import com.internship.auctionapp.models.Bid;

import java.util.List;
import java.util.UUID;

public interface BidService {
    Bid addBid(CreateBidRequest createBidRequest);

    List<Bid> getAllBids();

    void deleteBid(UUID id);

    List<Double> getHighestBidPrice(UUID productId);
}
