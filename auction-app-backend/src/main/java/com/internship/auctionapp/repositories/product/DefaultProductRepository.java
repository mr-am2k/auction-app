package com.internship.auctionapp.repositories.product;

import com.internship.auctionapp.middleware.exception.DeleteElementException;
import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.repositories.bid.BidRepository;
import com.internship.auctionapp.repositories.notification.NotificationRepository;
import com.internship.auctionapp.requests.CreateNotificationRequest;
import com.internship.auctionapp.requests.CreateProductRequest;
import com.internship.auctionapp.services.DefaultProductService;
import com.internship.auctionapp.util.NotificationType;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class DefaultProductRepository implements ProductRepository {
    private final ProductJPARepository productJPARepository;

    private final BidRepository bidRepository;

    private final NotificationRepository notificationRepository;

    private static final int DEFAULT_ELEMENTS_PER_PAGE = 8;

    private static final String LAST_CHANCE = "last-chance";

    private static final String EXPIRATION_DATE_TIME = "expirationDateTime";

    private static final String CREATION_DATE_TIME = "creationDateTime";

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultProductService.class);

    public DefaultProductRepository(ProductJPARepository productJPARepository, BidRepository bidRepository, NotificationRepository notificationRepository) {
        this.productJPARepository = productJPARepository;
        this.bidRepository = bidRepository;
        this.notificationRepository = notificationRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        List<Product> products = productJPARepository.findAll().stream()
                .map(product -> product.toDomainModel())
                .collect(Collectors.toList());

        LOGGER.info("Fetched all products={}", products);

        return products;
    }

    @Override
    public Product addProduct(CreateProductRequest createProductRequest) {
        ProductEntity productEntity = new ProductEntity();

        productEntity.setName(createProductRequest.getName());
        productEntity.setDescription(createProductRequest.getDescription());
        productEntity.setImageURLs(createProductRequest.getImageURLs());
        productEntity.setStartPrice(createProductRequest.getStartPrice());
        productEntity.setExpirationDateTime(createProductRequest.getExpirationDateTime().atZone(ZoneOffset.UTC));
        productEntity.setUserId(createProductRequest.getUserId());

        productJPARepository.save(productEntity);

        LOGGER.info("Successfully added product={} to the database.", productEntity);

        return productEntity.toDomainModel();
    }

    @Override
    public Product getSingleProduct(UUID id) {
        Product product = productJPARepository.findById(id).get().toDomainModel();
        LOGGER.info("Fetched product={}", product, " from the database with the id={} ", id);

        return product;
    }

    @Override
    public Product updateProduct(UUID id, ProductEntity product) {
        ProductEntity productForUpdate = productJPARepository.findById(id).get();

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.map(product, productForUpdate);

        LOGGER.info("Product with the id={} has been updated.", id);
        return productJPARepository.save(productForUpdate).toDomainModel();
    }

    @Override
    public void deleteProduct(UUID id) {
        try {
            productJPARepository.deleteById(id);
            LOGGER.info("Successfully deleted product with the id={}", id);
        } catch (RuntimeException e) {
            throw new DeleteElementException(e.getMessage());
        }
    }

    @Override
    public Product getRandomProduct() {
        Product randomProduct =  productJPARepository.getRandomProduct().toDomainModel();

        LOGGER.info("Fetched random product={}", randomProduct);

        return randomProduct;
    }

    @Override
    public Page<Product> getProductsByCriteria(String criteria) {
        final Pageable page = PageRequest.of(0, DEFAULT_ELEMENTS_PER_PAGE, criteria.equalsIgnoreCase(LAST_CHANCE) ?
                Sort.by(EXPIRATION_DATE_TIME).ascending() :
                Sort.by(CREATION_DATE_TIME).descending());

        LOGGER.info("Fetched page of 8 products from the database, based on criteria={} ", criteria);
        return productJPARepository.findAll(page).map(productEntity -> productEntity.toDomainModel());
    }

    @Override
    public List<Product> getProductsBetweenTwoDates(ZonedDateTime startDate, ZonedDateTime endDate) {
        return productJPARepository.findAllByExpirationDateTimeBetween(startDate, endDate).stream()
                .map(productEntity -> productEntity.toDomainModel())
                .collect(Collectors.toList());
    }

    @Override
    public void createNotificationsAfterProductExpires() {
        ZonedDateTime currentTime = ZonedDateTime.of(LocalDateTime.now(), ZoneOffset.UTC);
        List<Product> products = productJPARepository.findAllByExpirationDateTimeBetween(
                        currentTime.minusMinutes(5), currentTime).stream()
                .map(productEntity -> productEntity.toDomainModel())
                .collect(Collectors.toList());

        if (products.isEmpty()) {
            return;
        }

        products.stream()
                .forEach(product -> {
                    Bid bid = bidRepository.getHighestBid(product.getId());

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
                });
    }
}
