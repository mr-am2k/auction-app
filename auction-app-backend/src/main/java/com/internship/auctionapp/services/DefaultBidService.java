package com.internship.auctionapp.services;

import com.internship.auctionapp.DAO.CreateBidRequest;
import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.repositories.BidRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class DefaultBidService implements BidService {

    private final BidRepository bidRepository;

    private final ProductService productService;

    public DefaultBidService(BidRepository bidRepository, ProductService productService) {
        this.bidRepository = bidRepository;
        this.productService = productService;
    }

    @Override
    public Bid addBid(CreateBidRequest bid) {
        Product targetedProduct = productService.getSingleProduct(bid.getProductId());

        if (bid.getBidPrice() < targetedProduct.getPrice()) {
            throw new IllegalArgumentException("Bid price can't be lower than product price");
        }

        Bid newBid = new Bid(bid.getBidPrice(), LocalDateTime.now());
        Bid savedBid = bidRepository.save(newBid);
        targetedProduct.getBids().add(savedBid);
        productService.addProduct(targetedProduct);
        return savedBid;
    }

    @Override
    public List<Bid> getAllBids() {
        return bidRepository.findAll();
    }

    @Override
    public void deleteBid(UUID id) {
        bidRepository.deleteById(id);
    }

    @Override
    public double getHighestBid(UUID productId) {
        List<Bid> bids = bidRepository.getBidsByProductId(productId);
        double min = 0;
        for (Bid b:
             bids) {
            if(b.getBidPrice() > min){
             min = b.getBidPrice();
            }
        }
        return min;
    }
}
