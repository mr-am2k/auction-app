package com.internship.auctionapp.services.bid;

import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.middleware.exception.BidCreationFailedException;
import com.internship.auctionapp.middleware.exception.BidPriceLowerThanHighestBidPriceException;
import com.internship.auctionapp.middleware.exception.BidPriceLowerThanProductPriceException;
import com.internship.auctionapp.middleware.exception.MissingCreditCardException;
import com.internship.auctionapp.middleware.exception.ProductExpiredException;
import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.repositories.bid.BidRepository;
import com.internship.auctionapp.repositories.product.ProductRepository;
import com.internship.auctionapp.repositories.user.UserJpaRepository;
import com.internship.auctionapp.requests.ProductEventRequest;
import com.internship.auctionapp.requests.CreateBidRequest;
import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.requests.CreateNotificationRequest;
import com.internship.auctionapp.services.notification.NotificationService;
import com.internship.auctionapp.services.product.ProductService;
import com.internship.auctionapp.util.CreditCardUtils;
import com.internship.auctionapp.util.NotificationType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class DefaultBidService implements BidService {
    private final BidRepository bidRepository;

    private final ProductRepository productRepository;

    private final NotificationService notificationService;

    private final ProductService productService;

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultBidService.class);

    private final Integer DEFAULT_PAGE_SIZE = 5;
    private final UserJpaRepository userJpaRepository;

    public DefaultBidService(
            BidRepository bidRepository,
            ProductRepository productRepository,
            NotificationService notificationService,
            ProductService productService,
            UserJpaRepository userJpaRepository) {
        this.bidRepository = bidRepository;
        this.productRepository = productRepository;
        this.notificationService = notificationService;
        this.productService = productService;
        this.userJpaRepository = userJpaRepository;
    }

    @Override
    public Bid addBid(CreateBidRequest createBidRequest) {
        final Product product = productRepository.getSingleProduct(createBidRequest.getProductId());

        final UserEntity user = userJpaRepository.findById(createBidRequest.getUserId()).get();

        if(user.getCreditCard() == null || !CreditCardUtils.validCard(user.getCreditCard().toDomainModel())){
            throw new MissingCreditCardException();
        }

        createBidRequest.setPrice(Math.round(createBidRequest.getPrice() * 100.0) / 100.0);

        if (createBidRequest.getPrice() <= product.getStartPrice()) {
            LOGGER.info("Price user entered={} is lower than product start price={}.", createBidRequest.getPrice(), product.getStartPrice());
            throw new BidPriceLowerThanProductPriceException();
        }

        if (!product.getBids().isEmpty()) {
            final Double highestBidPrice = bidRepository.getHighestBid(createBidRequest.getProductId()).getPrice();

            if (createBidRequest.getPrice() <= highestBidPrice) {
                LOGGER.info("Bid price={} is lower than product highest bid price={}", createBidRequest.getPrice(), highestBidPrice);
                throw new BidPriceLowerThanHighestBidPriceException();
            }
        }

        if (product.getExpirationDateTime().isBefore(ZonedDateTime.now())) {
            throw new ProductExpiredException();
        }

        try {
            notificationService.createNotification(new CreateNotificationRequest(
                    NotificationType.HIGHEST_BID_PLACED,
                    createBidRequest.getUserId(),
                    createBidRequest.getProductId()
            ));

            final Bid savedBid = bidRepository.addBid(createBidRequest);

            final Product changedProduct = productRepository.getSingleProduct(savedBid.getProductId());

            ProductEventRequest productEventRequest = new ProductEventRequest();

            changedProduct.getBids().add(savedBid);

            productEventRequest.setProduct(changedProduct);
            productEventRequest.setHighestBidPrice(createBidRequest.getPrice());

            productService.emitEventOnProductBid(productEventRequest, product.getId());

            LOGGER.info("Successfully added bid={}", savedBid);

            return savedBid;
        } catch (RuntimeException ex) {
            throw new BidCreationFailedException();
        }
    }

    @Override
    public Double getHighestBidPrice(UUID productId) {
        Bid highestBid = bidRepository.getHighestBid(productId);

        LOGGER.info("Fetched bid with the highest price, bid={}", highestBid);

        return highestBid.getPrice();
    }

    @Override
    public List<Bid> getUserBids(UUID userId) {
        return bidRepository.getUserBids(userId);
    }

    @Override
    public Page<Bid> getProductBids(UUID productId, Integer pageNumber) {
        final Pageable page = PageRequest.of(pageNumber, DEFAULT_PAGE_SIZE);

        return bidRepository.getProductBids(productId, page);
    }
}
