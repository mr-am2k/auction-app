package com.internship.auctionapp.repositories.bid;

import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.requests.CreateBidRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface BidRepository {
    Bid addBid(CreateBidRequest createBidRequest);

    List<Bid> getAllBids();

    Bid getHighestBid(UUID productId);

    List<Bid> getUserBids(UUID userId);

    Page<Bid> getProductBids(UUID productId, Pageable page);
}
