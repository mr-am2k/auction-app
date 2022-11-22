package com.internship.auctionapp.repositories.bid;

import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.entities.BidEntity;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.middleware.exception.BidPriceLowerThanHighestBidPriceException;
import com.internship.auctionapp.middleware.exception.BidPriceLowerThanProductPriceException;
import com.internship.auctionapp.middleware.exception.SQLCustomException;
import com.internship.auctionapp.models.Notification;
import com.internship.auctionapp.repositories.notification.NotificationRepository;
import com.internship.auctionapp.repositories.product.ProductJPARepository;
import com.internship.auctionapp.requests.CreateNotificationRequest;
import com.internship.auctionapp.services.DefaultProductService;
import com.internship.auctionapp.util.NotificationMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultBidRepository.class);

    public DefaultBidRepository(
            ProductJPARepository productJPARepository,
            BidJPARepository bidJPARepository,
            NotificationRepository notificationRepository
    ) {
        this.productJPARepository = productJPARepository;
        this.bidJPARepository = bidJPARepository;
        this.notificationRepository = notificationRepository;
    }

    @Override
    public Bid addBid(UUID productId, double price, UUID userId) {
        ProductEntity targetedProduct = productJPARepository.findById(productId).get();
        if (price <= targetedProduct.getPrice()) {
            throw new BidPriceLowerThanProductPriceException();
        }

        List<Double> targetedBid = bidJPARepository.highestBidPrice(productId);

        if (targetedBid.size() > 0) {
            if (price <= targetedBid.get(0).doubleValue()) {
                throw new BidPriceLowerThanHighestBidPriceException();
            }

        }

        try {
            BidEntity newBidEntity = new BidEntity(price, targetedProduct, userId);
            notificationRepository.createNotification(new CreateNotificationRequest(
                    NotificationMessage.HIGHEST_BID_PLACED,
                    userId,
                    productId
            ));
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
    public List<Double> getHighestBidPrice(UUID productId) {
        return bidJPARepository.highestBidPrice(productId);
    }
}
