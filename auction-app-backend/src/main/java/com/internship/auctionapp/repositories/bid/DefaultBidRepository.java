package com.internship.auctionapp.repositories.bid;

import com.internship.auctionapp.domainmodels.Bid;
import com.internship.auctionapp.entities.BidEntity;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.middleware.exception.IllegalBidPriceException;
import com.internship.auctionapp.repositories.product.ProductRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class DefaultBidRepository implements BidRepository{

    private final ProductRepository productRepository;

    private final BidJPARepository bidJPARepository;

    public DefaultBidRepository(ProductRepository productRepository, BidJPARepository bidJPARepository) {
        this.productRepository = productRepository;
        this.bidJPARepository = bidJPARepository;
    }

    @Override
    public Bid addBid(UUID id, double price) {
        ProductEntity targetedProduct = productRepository.getSingleProduct(id);

        if (price <= targetedProduct.getPrice()) {
            throw new IllegalBidPriceException();
        }

        BidEntity newBidEntity = new BidEntity(price, targetedProduct);
        return bidJPARepository.save(newBidEntity).toDomainModel();
    }

    @Override
    public List<BidEntity> getAllBids() {
        return bidJPARepository.findAll();
    }

    @Override
    public void deleteBid(UUID id) {
        bidJPARepository.deleteById(id);
    }

    @Override
    public double getHighestBid(UUID productId) {
        return bidJPARepository.highestBid(productId);
    }
}
