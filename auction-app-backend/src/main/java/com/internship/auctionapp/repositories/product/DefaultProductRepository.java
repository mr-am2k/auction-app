package com.internship.auctionapp.repositories.product;

import com.internship.auctionapp.entities.CategoryEntity;
import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.repositories.category.CategoryJpaRepository;
import com.internship.auctionapp.repositories.user.UserJpaRepository;
import com.internship.auctionapp.requests.CreateProductRequest;

import org.modelmapper.ModelMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class DefaultProductRepository implements ProductRepository {
    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultProductRepository.class);

    private final ProductJpaRepository productJpaRepository;

    private final UserJpaRepository userJpaRepository;
    private final CategoryJpaRepository categoryJpaRepository;

    public DefaultProductRepository(ProductJpaRepository productJpaRepository, UserJpaRepository userJpaRepository,
                                    CategoryJpaRepository categoryJpaRepository) {
        this.productJpaRepository = productJpaRepository;
        this.userJpaRepository = userJpaRepository;
        this.categoryJpaRepository = categoryJpaRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return productJpaRepository.findAll().stream()
                .map(ProductEntity::toDomainModel)
                .collect(Collectors.toList());
    }

    @Override
    public Product addProduct(CreateProductRequest createProductRequest, String username) {
        ProductEntity productEntity = new ProductEntity();

        final LocalDateTime creationDateTime = createProductRequest.getCreationDateTime().toInstant().atZone(ZoneOffset.UTC).toLocalDateTime();
        final LocalDateTime expirationDateTime = createProductRequest.getExpirationDateTime().toInstant().atZone(ZoneOffset.UTC).toLocalDateTime();

        productEntity.setName(createProductRequest.getName());
        productEntity.setDescription(createProductRequest.getDescription());
        productEntity.setImageURLs(createProductRequest.getImageURLs());
        productEntity.setStartPrice(createProductRequest.getStartPrice());
        productEntity.setCreationDateTime(creationDateTime.atZone(ZoneOffset.UTC));
        productEntity.setExpirationDateTime(expirationDateTime.atZone(ZoneOffset.UTC));

        CategoryEntity category = categoryJpaRepository.findById(createProductRequest.getCategoryId()).get();
        productEntity.setCategory(category);

        final UserEntity user = userJpaRepository.findByUsername(username);

        productEntity.setUser(user);

        return productJpaRepository
                .save(productEntity)
                .toDomainModel();
    }

    @Override
    public Product getSingleProduct(UUID id) {
        return productJpaRepository.findById(id).get().toDomainModel();
    }

    @Override
    public Product updateProduct(UUID id, ProductEntity product) {
        final ProductEntity productForUpdate = productJpaRepository.findById(id).get();

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.map(product, productForUpdate);

        return productJpaRepository.save(productForUpdate).toDomainModel();
    }

    @Override
    public void deleteProduct(UUID id) {
        productJpaRepository.deleteById(id);
    }

    @Override
    public Page<Product>getRandomProduct(Pageable page) {
        return productJpaRepository.findAllByExpirationDateTimeAfter(ZonedDateTime.now(), page).map(ProductEntity::toDomainModel);
    }

    @Override
    public Page<Product> getProductsByCriteria(Pageable page) {
        return productJpaRepository.findAllByExpirationDateTimeAfter(ZonedDateTime.now(), page).map(ProductEntity::toDomainModel);
    }

    @Override
    public List<Product> getProductsBetweenTwoDates(ZonedDateTime startDate, ZonedDateTime endDate) {
        return productJpaRepository.findAllByExpirationDateTimeBetween(startDate, endDate).stream()
                .map(ProductEntity::toDomainModel)
                .collect(Collectors.toList());
    }

    @Override
    public List<Product> getProductsForUser(String username) {
        UserEntity user = userJpaRepository.findByUsername(username);

        return productJpaRepository.findAllByUserId(user.getId()).stream()
                .map(ProductEntity::toDomainModel)
                .collect(Collectors.toList());
    }
}
