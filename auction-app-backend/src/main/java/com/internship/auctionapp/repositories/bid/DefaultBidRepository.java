package com.internship.auctionapp.repositories.bid;

import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.middleware.exception.UserNotFoundByIdException;
import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.entities.BidEntity;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.repositories.user.UserJpaRepository;
import com.internship.auctionapp.repositories.product.ProductJpaRepository;
import com.internship.auctionapp.requests.CreateBidRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class DefaultBidRepository implements BidRepository {
    private final ProductJpaRepository productJpaRepository;

    private final BidJpaRepository bidJpaRepository;

    private final UserJpaRepository userJpaRepository;

    public DefaultBidRepository(
            ProductJpaRepository productJpaRepository,
            BidJpaRepository bidJpaRepository,
            UserJpaRepository userJpaRepository
    ) {
        this.productJpaRepository = productJpaRepository;
        this.bidJpaRepository = bidJpaRepository;
        this.userJpaRepository = userJpaRepository;
    }

    @Override
    public Bid addBid(CreateBidRequest createBidRequest) {
        final ProductEntity targetedProduct = productJpaRepository.findById(createBidRequest.getProductId()).get();

        final UserEntity user = userJpaRepository.findById(createBidRequest.getUserId()).get();

        final BidEntity newBidEntity = new BidEntity(
                createBidRequest.getPrice(),
                targetedProduct,
                user
        );

        return bidJpaRepository.save(newBidEntity).toDomainModel();
    }

    @Override
    public Bid getHighestBid(UUID productId) {
        return bidJpaRepository.findTopByProductIdOrderByPriceDesc(productId).toDomainModel();
    }

    @Override
    public List<Bid> getUserBids(UUID userId) {
        final UserEntity user = userJpaRepository.findById(userId).orElseThrow(() -> new UserNotFoundByIdException(userId.toString()));

        return bidJpaRepository.findAllByUserIdOrderByCreationDateTimeDesc(user.getId()).stream()
                .map(BidEntity::toDomainModel)
                .collect(Collectors.toList());
    }

    @Override
    public Page<Bid> getProductBids(UUID productId, Pageable page) {
        return bidJpaRepository.findAllByProductIdOrderByPriceDesc(productId, page).map(BidEntity::toDomainModel);
    }
}
