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
public class DefaultBidService implements BidService{

    private final BidRepository bidRepository;

    private final ProductService productService;

    private final ProductRepository productRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultProductService.class);

    public DefaultBidService(BidRepository bidRepository, ProductService productService, ProductRepository productRepository) {
        this.bidRepository = bidRepository;
        this.productService = productService;
        this.productRepository = productRepository;
    }

    @Override
    public Bid addBid(BidDAO bid) {
        try{
            Product targetedProduct = productService.getSingleProduct(bid.getProductId());
            Bid newBid = new Bid();
            newBid.setBidPrice(bid.getBidPrice());
            newBid.setBidCreationDateTime(LocalDateTime.now());
            Bid savedBid = bidRepository.save(newBid);
            targetedProduct.getBids().add(savedBid);
            productService.addProduct(targetedProduct);
            LOGGER.info("Successfully saved bid={}", savedBid);
            return savedBid;
        }catch (Exception ex){
            throw new RuntimeException(ex.getMessage());
        }
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
