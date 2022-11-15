package com.internship.auctionapp.services;

import com.internship.auctionapp.DAO.BidDAO;
import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.repositories.BidRepository;
import com.internship.auctionapp.repositories.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class DefaultBidService implements BidService {

    private final BidRepository bidRepository;

    private final ProductService productService;

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultProductService.class);

    public DefaultBidService(BidRepository bidRepository, ProductService productService) {
        this.bidRepository = bidRepository;
        this.productService = productService;
    }

    @Override
    public Bid addBid(BidDAO bid) {
        Product targetedProduct = productService.getSingleProduct(bid.getProductId());

        if (bid.getBidPrice() < targetedProduct.getPrice()) {
            throw new IllegalArgumentException("Bid price can't be lower than product price");
        }

        Bid newBid = new Bid(bid.getBidPrice(), LocalDateTime.now());
        Bid savedBid = bidRepository.save(newBid);
        targetedProduct.getBids().add(savedBid);
        productService.addProduct(targetedProduct);
        LOGGER.info("Successfully saved bid={}", savedBid);
        return savedBid;
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
