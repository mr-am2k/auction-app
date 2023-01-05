package com.internship.auctionapp.services.bid;

import com.internship.auctionapp.models.BidWithProduct;
import com.internship.auctionapp.requests.CreateBidRequest;
import com.internship.auctionapp.models.Bid;

import java.util.List;
import java.util.UUID;

public interface BidService {
    Bid addBid(CreateBidRequest createBidRequest);

    List<Bid> getAllBids();

    Double getHighestBidPrice(UUID productId);

    List<BidWithProduct> getUserBids(UUID userId);
}
