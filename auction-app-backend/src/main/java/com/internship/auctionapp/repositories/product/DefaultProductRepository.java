package com.internship.auctionapp.repositories.product;

import com.internship.auctionapp.models.Address;
import com.internship.auctionapp.entities.CategoryEntity;
import com.internship.auctionapp.entities.CreditCardEntity;
import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.middleware.exception.UserNotFoundByIdException;
import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.repositories.category.CategoryJpaRepository;
import com.internship.auctionapp.repositories.creditCard.CreditCardRepository;
import com.internship.auctionapp.repositories.user.UserJpaRepository;
import com.internship.auctionapp.requests.CreateProductDataRequest;
import com.internship.auctionapp.requests.CreateProductRequest;

import com.internship.auctionapp.util.filter.product.ProductFilter;
import com.internship.auctionapp.util.filter.product.ProductSpecification;
import org.modelmapper.ModelMapper;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class DefaultProductRepository implements ProductRepository {
    private final ProductJpaRepository productJpaRepository;

    private final UserJpaRepository userJpaRepository;

    private final CategoryJpaRepository categoryJpaRepository;

    private final CreditCardRepository creditCardRepository;

    public DefaultProductRepository(ProductJpaRepository productJpaRepository, UserJpaRepository userJpaRepository,
                                    CategoryJpaRepository categoryJpaRepository, CreditCardRepository creditCardRepository) {
        this.productJpaRepository = productJpaRepository;
        this.userJpaRepository = userJpaRepository;
        this.categoryJpaRepository = categoryJpaRepository;
        this.creditCardRepository = creditCardRepository;
    }

    @Override
    public Page<Product> getProducts(ProductFilter productFilter) {
        final ProductSpecification productSpecification = new ProductSpecification(productFilter);

        return productJpaRepository.findAll(productSpecification.toFilterSpecification(), productFilter.getPage()).map(ProductEntity::toDomainModel);
    }

    @Override
    public Product addProduct(CreateProductDataRequest createProductDataRequest) {
        ProductEntity productEntity = new ProductEntity();

        final CreateProductRequest createProductRequest = createProductDataRequest.getCreateProductRequest();
        final Address address = createProductDataRequest.getCreateProductRequest().getAddress();

        final LocalDateTime creationDateTime = createProductRequest.getCreationDateTime().toInstant().atZone(ZoneOffset.UTC).toLocalDateTime();
        final LocalDateTime expirationDateTime = createProductRequest.getExpirationDateTime().toInstant().atZone(ZoneOffset.UTC).toLocalDateTime();

        productEntity.setName(createProductRequest.getName());
        productEntity.setDescription(createProductRequest.getDescription());
        productEntity.setImageURLs(createProductRequest.getImageURLs());
        productEntity.setStartPrice(createProductRequest.getStartPrice());
        productEntity.setCreationDateTime(creationDateTime.atZone(ZoneOffset.UTC));
        productEntity.setExpirationDateTime(expirationDateTime.atZone(ZoneOffset.UTC));
        productEntity.setAddress(address);

        final CategoryEntity category = categoryJpaRepository.findById(createProductRequest.getCategoryId()).get();
        productEntity.setCategory(category);

        final CategoryEntity subcategory = categoryJpaRepository.findById(createProductRequest.getSubcategoryId()).get();
        productEntity.setSubcategory(subcategory);

        final UserEntity user = userJpaRepository.findById(createProductRequest.getUserId()).orElseThrow(() ->
                new UserNotFoundByIdException(createProductRequest.getUserId().toString())
        );
        productEntity.setUser(user);

        final CreditCardEntity creditCard = creditCardRepository.addCreditCard(createProductDataRequest.getCreateCreditCardRequest());
        productEntity.setCreditCard(creditCard);

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
    public Page<Product> getRandomProduct(Pageable page) {
        return productJpaRepository.findAllByExpirationDateTimeAfterAndCreationDateTimeBefore(ZonedDateTime.now(), ZonedDateTime.now(), page).map(ProductEntity::toDomainModel);
    }

    @Override
    public Page<Product> getProductsByCriteria(Pageable page) {
        return productJpaRepository.findAllByExpirationDateTimeAfterAndCreationDateTimeBefore(ZonedDateTime.now(), ZonedDateTime.now(), page).map(ProductEntity::toDomainModel);
    }

    @Override
    public List<Product> getProductsBetweenTwoDates(ZonedDateTime startDate, ZonedDateTime endDate) {
        return productJpaRepository.findAllByExpirationDateTimeBetween(startDate, endDate).stream()
                .map(ProductEntity::toDomainModel)
                .collect(Collectors.toList());
    }

    @Override
    public List<Product> getUserProducts(UUID userId) {
        UserEntity user = userJpaRepository.findById(userId).orElseThrow(() -> new UserNotFoundByIdException(userId.toString()));

        return productJpaRepository.findAllByUserId(user.getId()).stream()
                .map(ProductEntity::toDomainModel)
                .collect(Collectors.toList());
    }

    @Override
    public Page<Product> getRelatedProducts(UUID categoryId, UUID productId, Pageable page) {
        ZonedDateTime currentTime = ZonedDateTime.of(LocalDateTime.now(), ZoneOffset.UTC);
        return productJpaRepository.findAllByCategoryIdAndIdNotAndCreationDateTimeBeforeAndExpirationDateTimeAfter(
                categoryId,
                productId,
                currentTime,
                currentTime,
                page
        ).map(ProductEntity::toDomainModel);
    }
}
