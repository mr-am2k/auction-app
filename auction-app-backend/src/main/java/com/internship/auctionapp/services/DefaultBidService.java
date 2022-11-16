package com.internship.auctionapp.services;

import com.internship.auctionapp.DAO.CreateBidRequest;
import com.internship.auctionapp.DTO.BidDTO;
import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.repositories.BidRepository;
import com.internship.auctionapp.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class DefaultBidService implements BidService {

    private final BidRepository bidRepository;

    private final ProductService productService;

    private final ProductRepository productRepository;

    public DefaultBidService(BidRepository bidRepository, ProductService productService, ProductRepository productRepository) {
        this.bidRepository = bidRepository;
        this.productService = productService;
        this.productRepository = productRepository;
    }

    @Override
    public String addBid(CreateBidRequest bid) {
        Product targetedProduct = productService.getSingleProduct(bid.getProductId());

        if (bid.getBidPrice() < targetedProduct.getPrice()) {
            throw new IllegalArgumentException("Bid price can't be lower than product price");
        }

        Bid newBid = new Bid(bid.getBidPrice(), LocalDateTime.now(), targetedProduct);
        targetedProduct.getBids().add(newBid);
        productRepository.save(targetedProduct);
        return "Added new bid";
    }

    @Override
    public List<BidDTO> getAllBids() {
        List<Bid> bids = bidRepository.findAll();
        List<BidDTO> bidDTOs = new ArrayList<>();
        for (Bid b :
                bids) {
            BidDTO tempBid = new BidDTO(b.getId(), b.getBidPrice(),
                    b.getBidCreationDateTime(), b.getProduct().getId());
            bidDTOs.add(tempBid);
        }

        return bidDTOs;
    }

    @Override
    public void deleteBid(UUID id) {
        bidRepository.deleteById(id);
    }

    @Override
    public double getHighestBid(UUID productId) {
        List<Bid> bids = bidRepository.getBidsByProductId(productId);
        double min = 0;
        for (Bid b :
                bids) {
            if (b.getBidPrice() > min) {
                min = b.getBidPrice();
            }
        }
        return min;
    }
}
