package com.internship.auctionapp.services;

import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.repositories.BidRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class DefaultBidService implements BidService{

    private final BidRepository bidRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultProductService.class);

    public DefaultBidService(BidRepository bidRepository) {
        this.bidRepository = bidRepository;
    }

    @Override
    public Bid addBid(Bid bid) {
        bid.setBidCreationDateTime(LocalDateTime.now());
        LOGGER.info("Successfully saved bid={}", bid);
        return bidRepository.save(bid);
    }

    @Override
    public List<Bid> getAllBids() {
        LOGGER.info("Fetched all bids from the database");
        return bidRepository.findAll();
    }

    @Override
    public void deleteBid(UUID id) {
        bidRepository.deleteById(id);
    }
}
