package com.internship.auctionapp.services.bid;

import com.internship.auctionapp.requests.CreateBidRequest;
import com.internship.auctionapp.models.Bid;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface BidService {
    Bid addBid(CreateBidRequest createBidRequest);

    List<Bid> getAllBids();

    Double getHighestBidPrice(UUID productId);

    List<Bid> getUserBids(UUID userId);

    Page<Bid> getProductBids(UUID productId, Integer pageNumber);
}
