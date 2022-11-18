package com.internship.auctionapp.repositories.bid;

import com.internship.auctionapp.domainmodels.Bid;
import com.internship.auctionapp.entities.BidEntity;
import com.internship.auctionapp.requests.CreateBidRequest;

import java.util.List;
import java.util.UUID;

public interface BidRepository {
    Bid addBid(UUID id, double price);

    List<BidEntity> getAllBids();

    void deleteBid(UUID id);

    double getHighestBid(UUID productId);
}
