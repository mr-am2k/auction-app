package com.internship.auctionapp.services.bid;

import com.internship.auctionapp.models.BidWithProduct;
import com.internship.auctionapp.requests.CreateBidRequest;
import com.internship.auctionapp.models.Bid;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;

public interface BidService {
    Bid addBid(CreateBidRequest createBidRequest);

    List<BidWithProduct> getAllBids();

    Double getHighestBidPrice(UUID productId);

    List<BidWithProduct> getBidsForUser(HttpServletRequest request);
}
