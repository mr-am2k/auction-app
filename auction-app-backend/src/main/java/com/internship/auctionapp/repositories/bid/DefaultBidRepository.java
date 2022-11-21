package com.internship.auctionapp.repositories.bid;

import ch.qos.logback.classic.Logger;
import com.internship.auctionapp.domainmodels.Bid;
import com.internship.auctionapp.entities.BidEntity;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.middleware.exception.IllegalBidPriceException;
import com.internship.auctionapp.middleware.exception.SQLCustomException;
import com.internship.auctionapp.repositories.notification.NotificationRepository;
import com.internship.auctionapp.repositories.product.ProductRepository;
import com.internship.auctionapp.requests.CreateNotificationRequest;
import com.internship.auctionapp.util.NotificationMessage;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Repository
public class DefaultBidRepository implements BidRepository {

    private final ProductRepository productRepository;

    private final BidJPARepository bidJPARepository;

    private final NotificationRepository notificationRepository;

    public DefaultBidRepository(ProductRepository productRepository, BidJPARepository bidJPARepository, NotificationRepository notificationRepository) {
        this.productRepository = productRepository;
        this.bidJPARepository = bidJPARepository;
        this.notificationRepository = notificationRepository;
    }

    @Override
    @Transactional
    public Bid addBid(UUID productId, double price, UUID userId) {
        ProductEntity targetedProduct = productRepository.getSingleProduct(productId);
        if (price <= targetedProduct.getPrice()) {
            throw new IllegalBidPriceException("Bid price can't be lower than product price.");
        }

        if(bidJPARepository.getBidEntitiesByProduct(targetedProduct).size() > 0){
            double targetedBid = bidJPARepository.highestBid(productId);
            if (price <= targetedBid) {
                throw new IllegalBidPriceException("Bid price can't be lower than current bid price.");
            }
        }

        try {
            BidEntity newBidEntity = new BidEntity(price, targetedProduct, userId);

            notificationRepository.addNotification(new CreateNotificationRequest(NotificationMessage.HIGHEST_BIDDER,
                    userId, productId));

            return bidJPARepository.save(newBidEntity).toDomainModel();
        } catch (SQLCustomException ex) {
            throw new SQLCustomException(ex.getMessage());
        }
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
