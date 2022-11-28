package com.internship.auctionapp.repositories.bid;

import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.entities.BidEntity;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.repositories.product.ProductJpaRepository;
import com.internship.auctionapp.requests.CreateBidRequest;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class DefaultBidRepository implements BidRepository {

    private final ProductJpaRepository productJPARepository;

    private final BidJpaRepository bidJPARepository;

    public DefaultBidRepository(
            ProductJpaRepository productJPARepository,
            BidJpaRepository bidJPARepository
    ) {
        this.productJPARepository = productJPARepository;
        this.bidJPARepository = bidJPARepository;
    }

    @Override
    public Bid addBid(CreateBidRequest createBidRequest) {
        final ProductEntity targetedProduct = productJPARepository.findById(createBidRequest.getProductId()).get();
        final BidEntity newBidEntity = new BidEntity(
                createBidRequest.getPrice(),
                targetedProduct,
                createBidRequest.getUserId()
        );

        return bidJPARepository.save(newBidEntity).toDomainModel();
    }

    @Override
    public List<Bid> getAllBids() {
        return bidJPARepository.findAll().stream()
                .map(bidEntity -> bidEntity.toDomainModel())
                .collect(Collectors.toList());
    }

    @Override
    public void deleteBid(UUID id) {
        bidJPARepository.deleteById(id);
    }

    @Override
    public Bid getHighestBid(UUID productId) {
        return bidJPARepository.findTopByProductIdOrderByPriceDesc(productId).toDomainModel();
    }
}
