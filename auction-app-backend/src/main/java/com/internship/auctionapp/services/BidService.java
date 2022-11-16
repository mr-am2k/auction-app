package com.internship.auctionapp.services;

import com.internship.auctionapp.DAO.CreateBidRequest;
import com.internship.auctionapp.DTO.BidDTO;
import com.internship.auctionapp.models.Bid;

import java.util.List;
import java.util.UUID;

public interface BidService {
    String addBid(CreateBidRequest bid);

    List<BidDTO> getAllBids();

    void deleteBid(UUID id);

    double getHighestBid(UUID productId);
}
