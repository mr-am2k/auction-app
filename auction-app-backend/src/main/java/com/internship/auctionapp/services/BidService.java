package com.internship.auctionapp.services;

import com.internship.auctionapp.DAO.CreateBidRequest;
import com.internship.auctionapp.DTO.BidDTO;

import java.util.List;
import java.util.UUID;

public interface BidService {
    String addBid(CreateBidRequest createBidRequest);

    List<BidDTO> getAllBids();

    void deleteBid(UUID id);

    double getHighestBid(UUID productId);
}
