package com.internship.auctionapp.services;

import com.internship.auctionapp.repositories.bid.BidRepository;
import com.internship.auctionapp.requests.CreateBidRequest;
import com.internship.auctionapp.domainmodels.Bid;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DefaultBidService implements BidService {

    private final BidRepository bidRepository;

    public DefaultBidService(BidRepository bidRepository) {
        this.bidRepository = bidRepository;
    }

    @Override
    public Bid addBid(CreateBidRequest createBidRequest) {
        return bidRepository.addBid(createBidRequest.getProductId(), createBidRequest.getBidPrice(),
                createBidRequest.getUserId());
    }

    @Override
    public List<Bid> getAllBids() {
        return bidRepository.getAllBids().stream().map(bidEntity -> bidEntity.toDomainModel()).collect(Collectors.toList());
    }

    @Override
    public void deleteBid(UUID id) {
        bidRepository.deleteBid(id);
    }

    @Override
    public double getHighestBid(UUID productId) {
        return bidRepository.getHighestBid(productId);
    }
}
