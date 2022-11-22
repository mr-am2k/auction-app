package com.internship.auctionapp.services;

import com.internship.auctionapp.repositories.bid.BidRepository;
import com.internship.auctionapp.requests.CreateBidRequest;
import com.internship.auctionapp.domainmodels.Bid;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DefaultBidService implements BidService {

    private final BidRepository bidRepository;

    public DefaultBidService(BidRepository bidRepository) {
        this.bidRepository = bidRepository;
    }

    @Override
    public Bid addBid(CreateBidRequest createBidRequest) {
        return bidRepository.addBid(createBidRequest.getProductId(), createBidRequest.getPrice(),
                createBidRequest.getUserId());
    }

    @Override
    public List<Bid> getAllBids() {
        return bidRepository.getAllBids();
    }

    @Override
    public void deleteBid(UUID id) {
        bidRepository.deleteBid(id);
    }

    @Override
    public double getHighestBidPrice(UUID productId) {
        return bidRepository.getHighestBidPrice(productId);
    }
}
