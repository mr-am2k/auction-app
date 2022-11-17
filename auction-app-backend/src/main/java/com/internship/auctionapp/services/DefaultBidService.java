package com.internship.auctionapp.services;

import com.internship.auctionapp.requests.CreateBidRequest;
import com.internship.auctionapp.domainmodels.Bid;
import com.internship.auctionapp.middleware.exception.IllegalBidPriceException;
import com.internship.auctionapp.entities.BidEntity;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.repositories.BidRepository;
import com.internship.auctionapp.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
    public Bid addBid(CreateBidRequest createBidRequest) {
        ProductEntity targetedProduct = productService.getSingleProduct(createBidRequest.getProductId());

        if (createBidRequest.getBidPrice() <= targetedProduct.getPrice()) {
            throw new IllegalBidPriceException();
        }

        BidEntity newBidEntity = new BidEntity(createBidRequest.getBidPrice(), LocalDateTime.now(), targetedProduct);
        return bidRepository.save(newBidEntity).toDomainModel();
    }

    @Override
    public List<Bid> getAllBids() {
        return bidRepository.findAll().stream().map(bidEntity -> bidEntity.toDomainModel()).collect(Collectors.toList());
    }

    @Override
    public void deleteBid(UUID id) {
        bidRepository.deleteById(id);
    }

    @Override
    public double getHighestBid(UUID productId) {
        return bidRepository.highestBid(productId);
    }
}
