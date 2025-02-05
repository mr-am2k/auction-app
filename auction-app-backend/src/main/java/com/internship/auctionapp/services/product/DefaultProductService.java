package com.internship.auctionapp.services.product;

import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.middleware.exception.AuctionNotFinishedException;
import com.internship.auctionapp.middleware.exception.CurrentUserIsNotTheHighestBidderException;
import com.internship.auctionapp.middleware.exception.ProductAlreadyPurchasedException;
import com.internship.auctionapp.middleware.exception.ProductCreationDateTimeException;
import com.internship.auctionapp.middleware.exception.ProductImagesMaximumException;
import com.internship.auctionapp.middleware.exception.ProductImagesMinimumException;
import com.internship.auctionapp.middleware.exception.ProductNegativeStartPriceException;
import com.internship.auctionapp.middleware.exception.ProductNotFoundException;
import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.models.Payment;
import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.middleware.exception.ProductExpirationDateException;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.repositories.bid.BidRepository;
import com.internship.auctionapp.repositories.notification.NotificationRepository;
import com.internship.auctionapp.repositories.payment.PaymentRepository;
import com.internship.auctionapp.repositories.product.ProductJpaRepository;
import com.internship.auctionapp.repositories.product.ProductRepository;
import com.internship.auctionapp.repositories.user.UserJpaRepository;
import com.internship.auctionapp.requests.CreateNotificationRequest;
import com.internship.auctionapp.requests.CreatePaymentRequest;
import com.internship.auctionapp.requests.CreateProductDataRequest;
import com.internship.auctionapp.requests.ProductEventRequest;
import com.internship.auctionapp.requests.SearchProductRequest;
import com.internship.auctionapp.services.payment.PaymentService;
import com.internship.auctionapp.util.DateUtils;
import com.internship.auctionapp.util.NotificationType;

import com.internship.auctionapp.util.filter.product.ProductFilter;
import com.internship.auctionapp.util.sse.ProductEventService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

import java.util.List;
import java.util.UUID;

@Service
public class DefaultProductService implements ProductService {
    @Value("${scheduler.auction_finished_delay}")
    private String auctionFinishedDelayTime;

    private final ProductRepository productRepository;

    private final BidRepository bidRepository;

    private final NotificationRepository notificationRepository;

    private final UserJpaRepository userJpaRepository;

    private final ProductJpaRepository productJpaRepository;

    private final PaymentRepository paymentRepository;

    private final PaymentService paymentService;

    private final ProductEventService productEventService;

    private static final Integer DEFAULT_ELEMENTS_PER_PAGE = 8;

    private static final Integer RELATED_PRODUCTS_PER_PAGE = 3;

    private static final String LAST_CHANCE = "last-chance";

    private static final String EXPIRATION_DATE_TIME = "expirationDateTime";

    private static final String CREATION_DATE_TIME = "creationDateTime";

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultProductService.class);

    public DefaultProductService(ProductRepository productCRUDRepository,
                                 BidRepository bidRepository,
                                 NotificationRepository notificationRepository,
                                 UserJpaRepository userJpaRepository, ProductJpaRepository productJpaRepository, PaymentRepository paymentRepository, PaymentService paymentService, ProductEventService productEventService) {
        this.productRepository = productCRUDRepository;
        this.bidRepository = bidRepository;
        this.notificationRepository = notificationRepository;
        this.userJpaRepository = userJpaRepository;
        this.productJpaRepository = productJpaRepository;
        this.paymentRepository = paymentRepository;
        this.paymentService = paymentService;
        this.productEventService = productEventService;
    }

    @Override
    public Page<Product> getProducts(SearchProductRequest searchProductRequest) {
        final ProductFilter productFilter = ProductFilter.builder()
                .productName(searchProductRequest.getName())
                .categoryId(searchProductRequest.getCategoryId())
                .subcategoryIds(searchProductRequest.getSubcategoryIds())
                .minPrice(searchProductRequest.getMinPrice())
                .maxPrice(searchProductRequest.getMaxPrice())
                .productSort(searchProductRequest.getProductSort())
                .page(searchProductRequest.toPage())
                .build();

        return productRepository.getProducts(productFilter);
    }

    @Override
    public Product addProduct(CreateProductDataRequest createProductDataRequest) {
        final LocalDateTime expirationDateTime = createProductDataRequest.getCreateProductRequest().getExpirationDateTime()
                .toInstant().atZone(ZoneOffset.UTC).toLocalDateTime();

        if (DateUtils.isInPast(expirationDateTime)) {
            LOGGER.error("Product expiration date is before product creation date. Product={}", createProductDataRequest.getCreateProductRequest());

            throw new ProductExpirationDateException();
        }

        if (createProductDataRequest.getCreateProductRequest().getStartPrice() < 1) {
            LOGGER.error("Product price={}, is lower than 1", createProductDataRequest.getCreateProductRequest());

            throw new ProductNegativeStartPriceException();
        }

        if (createProductDataRequest.getCreateProductRequest().getImageURLs().size() < 3) {
            LOGGER.error("Number of uploaded images {}, is lower than 3", createProductDataRequest.getCreateProductRequest().getImageURLs().size());

            throw new ProductImagesMinimumException();
        }

        if (createProductDataRequest.getCreateProductRequest().getImageURLs().size() > 10) {
            LOGGER.error("Number of uploaded images {}, is greater than 10", createProductDataRequest.getCreateProductRequest().getImageURLs().size());

            throw new ProductImagesMaximumException();
        }

        if(DateUtils.isInPast(createProductDataRequest.getCreateProductRequest().getCreationDateTime())){
            LOGGER.error("Date={} is in the past", createProductDataRequest.getCreateProductRequest().getCreationDateTime());

            throw new ProductCreationDateTimeException();
        }

        final Product savedProduct = productRepository.addProduct(createProductDataRequest);

        LOGGER.info("Successfully added product={} to the database.", savedProduct);

        return savedProduct;
    }

    @Override
    public Product getSingleProduct(UUID id) {
        Product product = productRepository.getSingleProduct(id);

        LOGGER.info("Fetched product={} from the database with the product_id={}", product, id);

        return product;
    }

    @Override
    public Product updateProduct(UUID id, ProductEntity product) {
        Product updatedProduct = productRepository.updateProduct(id, product);

        LOGGER.info("Product with the product_id={} has been updated.", id);

        return updatedProduct;
    }

    @Override
    public void deleteProduct(UUID id) {
        try {
            productRepository.deleteProduct(id);

            LOGGER.info("Successfully deleted product with the product_id={}", id);
        } catch (RuntimeException ex) {
            throw new ProductNotFoundException(String.valueOf(id));
        }
    }

    @Override
    public Page<Product> getRandomProduct() {
        final Pageable page = PageRequest.of(0, 1);

        return productRepository.getRandomProduct(page);
    }

    @Override
    public Page<Product> getProductsByCriteria(String criteria) {
        final Pageable page = PageRequest.of(0, DEFAULT_ELEMENTS_PER_PAGE, criteria.equalsIgnoreCase(LAST_CHANCE) ?
                Sort.by(EXPIRATION_DATE_TIME).ascending() :
                Sort.by(CREATION_DATE_TIME).descending());

        Page<Product> returnedPage = productRepository.getProductsByCriteria(page);

        LOGGER.info("Fetched page of 8 products from the database, based on criteria={} ", criteria);

        return returnedPage;
    }

    @Override
    public List<Product> getUserProducts(UUID userId) {
        return productRepository.getUserProducts(userId);
    }

    @Override
    public Page<Product> getRelatedProducts(UUID categoryId, UUID productId) {
        final Pageable page = PageRequest.of(0, RELATED_PRODUCTS_PER_PAGE);

        return productRepository.getRelatedProducts(categoryId, productId, page);
    }

    @Override
    public Payment purchase(String username, CreatePaymentRequest createPaymentRequest) {
        final ProductEntity product = productJpaRepository.findById(createPaymentRequest.getProductId()).orElseThrow(() ->
                new ProductNotFoundException(createPaymentRequest.getProductId().toString()));

        final UserEntity user = userJpaRepository.findByUsername(username);

        final Bid highestBid = bidRepository.getHighestBid(product.getId());

        final boolean isPaid = paymentRepository.isPaid(product.getId());

        if (isPaid) {
            LOGGER.info("Product with product_id={} is already purchased!", product.getId());
            throw new ProductAlreadyPurchasedException();
        }

        if (highestBid.getUserId() != user.getId()) {
            LOGGER.info("User={} is not the highest bidder! User={} is the highest bidder", user.getId(), highestBid.getUserId());
            throw new CurrentUserIsNotTheHighestBidderException();
        }

        if (DateUtils.isInPast(product.getExpirationDateTime().toLocalDateTime(), LocalDateTime.now())) {
            LOGGER.info("Auction is not over yet! Auction end time is={}", product.getExpirationDateTime().toLocalDateTime());
            throw new AuctionNotFinishedException();
        }

        return paymentService.completePayment(user, product, createPaymentRequest);
    }

    @Override
    public void createNotificationsAfterProductExpires() {
        final ZonedDateTime currentTime = ZonedDateTime.of(LocalDateTime.now(), ZoneOffset.UTC);
        final List<Product> products = productRepository.getProductsBetweenTwoDates(
                currentTime.minus(Duration.ofMillis(Integer.valueOf(auctionFinishedDelayTime))),
                currentTime
        );

        products.stream()
                .forEach(product -> {
                    createNotificationOnAuctionFinish(product);
                });
    }

    @Override
    public void emitEventOnProductBid(ProductEventRequest productEventRequest, UUID productId) {
        productEventService.sendChangedProduct(productEventRequest, productId);
    }

    private void createNotificationOnAuctionFinish(Product product) {
        final Bid bid = bidRepository.getHighestBid(product.getId());

        CreateNotificationRequest auctionWonNotification =
                new CreateNotificationRequest(
                        NotificationType.AUCTION_WON,
                        bid.getUserId(),
                        product.getId()
                );

        notificationRepository.createNotification(auctionWonNotification);

        notificationRepository.getNotificationsByProductIdForAllUsersExcept(bid.getUserId(), product.getId())
                .stream()
                .forEach(notification -> {
                    CreateNotificationRequest auctionLostNotification =
                            new CreateNotificationRequest(
                                    NotificationType.AUCTION_LOST,
                                    notification.getUserId(),
                                    product.getId()
                            );

                    notificationRepository.createNotification(auctionLostNotification);
                });
    }
}
