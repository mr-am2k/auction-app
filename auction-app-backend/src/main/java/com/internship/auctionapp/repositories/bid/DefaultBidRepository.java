package com.internship.auctionapp.repositories.bid;

import com.internship.auctionapp.middleware.exception.DeleteElementException;
import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.entities.BidEntity;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.middleware.exception.BidPriceLowerThanHighestBidPriceException;
import com.internship.auctionapp.middleware.exception.BidPriceLowerThanProductPriceException;
import com.internship.auctionapp.middleware.exception.CreateBidException;
import com.internship.auctionapp.repositories.notification.NotificationRepository;
import com.internship.auctionapp.repositories.product.ProductJPARepository;
import com.internship.auctionapp.requests.CreateNotificationRequest;
import com.internship.auctionapp.util.NotificationType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

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
        final ProductEntity targetedProduct = productJPARepository.findById(productId).get();

        if (price <= targetedProduct.getStartPrice()) {
            LOGGER.info("Price user entered={} is lower than product start price={}.", price, targetedProduct.getStartPrice());
            throw new BidPriceLowerThanProductPriceException();
        }

        if (targetedProduct.getBidEntities().size() > 0) {
            final Double highestBidPrice = bidJPARepository.findTopByProductIdOrderByPriceDesc(productId).getPrice();

            if (price <= highestBidPrice) {
                LOGGER.info("Price user entered={} is lower than product highest bid price={}", price, highestBidPrice);
                throw new BidPriceLowerThanHighestBidPriceException();
            }
        }

        try {
            final BidEntity newBidEntity = new BidEntity(price, targetedProduct, userId);

            notificationRepository.createNotification(new CreateNotificationRequest(
                    NotificationType.HIGHEST_BID_PLACED,
                    userId,
                    productId
            ));

            final Bid bid = bidJPARepository.save(newBidEntity).toDomainModel();

            LOGGER.info("Successfully added bid={}", bid);

            return bid;
        } catch (RuntimeException ex) {
            throw new CreateBidException();
        }
    }

    @Override
    public List<Bid> getAllBids() {
        final List<Bid> bids = bidJPARepository.findAll().stream()
                .map(bidEntity -> bidEntity.toDomainModel())
                .collect(Collectors.toList());

        LOGGER.info("Fetched bids={}", bids);

        return bids;
    }

    @Override
    public void deleteBid(UUID id) {
        try {
            bidJPARepository.deleteById(id);

            LOGGER.info("Bid with bid_id={} deleted.", id);
        } catch (RuntimeException ex) {
            throw new DeleteElementException(ex.getMessage());
        }
    }

    @Override
    public Bid getHighestBid(UUID productId) {
        final Bid highestBid = bidJPARepository.findTopByProductIdOrderByPriceDesc(productId).toDomainModel();

        LOGGER.info("Bid with the highest price, bid={}", highestBid);

        return highestBid;
    }
}
