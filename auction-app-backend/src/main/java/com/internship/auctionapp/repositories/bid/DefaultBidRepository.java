package com.internship.auctionapp.repositories.bid;

import com.internship.auctionapp.domainmodels.Bid;
import com.internship.auctionapp.entities.BidEntity;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.middleware.exception.BidPriceLowerThanHighestBidPriceException;
import com.internship.auctionapp.middleware.exception.BidPriceLowerThanProductPriceException;
import com.internship.auctionapp.middleware.exception.SQLCustomException;
import com.internship.auctionapp.repositories.notification.NotificationRepository;
import com.internship.auctionapp.repositories.product.ProductJPARepository;
import com.internship.auctionapp.requests.CreateNotificationRequest;
import com.internship.auctionapp.util.NotificationMessage;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class DefaultBidRepository implements BidRepository {

    private final ProductJPARepository productJPARepository;

    private final BidJPARepository bidJPARepository;

    private final NotificationRepository notificationRepository;

    public DefaultBidRepository(ProductJPARepository productJPARepository, BidJPARepository bidJPARepository, NotificationRepository notificationRepository) {
        this.productJPARepository = productJPARepository;
        this.bidJPARepository = bidJPARepository;
        this.notificationRepository = notificationRepository;
    }

    @Override
    @Transactional
    public Bid addBid(UUID productId, double price, UUID userId) {
        ProductEntity targetedProduct = productJPARepository.findById(productId).get();

        if (price <= targetedProduct.getPrice()) {
            throw new BidPriceLowerThanProductPriceException();
        }

        if(bidJPARepository.getBidsByProductId(targetedProduct.getId()).size() > 0){
            double targetedBid = bidJPARepository.highestBidPrice(productId);
            if (price <= targetedBid) {
                throw new BidPriceLowerThanHighestBidPriceException();
            }
        }

        try {
            BidEntity newBidEntity = new BidEntity(price, targetedProduct, userId);

            notificationRepository.createNotification(new CreateNotificationRequest(NotificationMessage.HIGHEST_BIDDER,
                    userId, productId));

            return bidJPARepository.save(newBidEntity).toDomainModel();
        } catch (SQLCustomException ex) {
            throw new SQLCustomException(ex.getMessage());
        }
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
    public double getHighestBidPrice(UUID productId) {
        return bidJPARepository.highestBidPrice(productId);
    }

    @Override
    public Bid getHighestBid(UUID productId) {
        return bidJPARepository.getHighestBid(productId).toDomainModel();
    }
}
