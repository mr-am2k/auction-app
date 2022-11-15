package com.internship.auctionapp.services;

import com.internship.auctionapp.DAO.BidDAO;
import com.internship.auctionapp.models.Bid;

import java.util.List;
import java.util.UUID;

public interface BidService {
    Bid addBid(BidDAO bid);

    List<Bid> getAllBids();

    void deleteBid(UUID id);
}
