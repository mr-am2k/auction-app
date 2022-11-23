package com.internship.auctionapp.repositories.product;

import com.internship.auctionapp.entities.BidEntity;
import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.requests.CreateProductRequest;
import com.internship.auctionapp.services.DefaultProductService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class DefaultProductRepository implements ProductRepository {
    private final ProductJPARepository productJPARepository;

    private static final int DEFAULT_ELEMENTS_PER_PAGE = 8;

    private static final String LAST_CHANCE = "last-chance";

    private static final String EXPIRATION_DATE_TIME = "expirationDateTime";

    private static final String CREATION_DATE_TIME = "creationDateTime";

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultProductService.class);

    public DefaultProductRepository(ProductJPARepository productJPARepository) {
        this.productJPARepository = productJPARepository;
    }

    @Override
    public List<Product> getAllProducts(){
        return productJPARepository.findAll().stream()
                .map(product -> product.toDomainModel())
                .collect(Collectors.toList());
    }

    @Override
    public Product addProduct(CreateProductRequest createProductRequest) {
        ProductEntity productEntity = new ProductEntity();

        productEntity.setName(createProductRequest.getName());
        productEntity.setDescription(createProductRequest.getDescription());
        productEntity.setImageURLs(createProductRequest.getImageURLs());
        productEntity.setPrice(createProductRequest.getPrice());
        productEntity.setExpirationDateTime(createProductRequest.getExpirationDateTime());
        productEntity.setUserId(createProductRequest.getUserId());

        productJPARepository.save(productEntity);
        LOGGER.info("Successfully added product={} to the database.", productEntity);
        return productEntity.toDomainModel();
    }

    @Override
    public List<Product> getSingleProduct(UUID id) {
        LOGGER.info("Fetched product from the database with the id={} ", id);
        return productJPARepository.findById(id).stream()
                .map(product -> product.toDomainModel())
                .collect(Collectors.toList());
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
        LOGGER.info("Successfully deleted product with the id={}", id);
        productJPARepository.deleteById(id);
    }

    @Override
    public List<Product> getRandomProduct() {
        LOGGER.info("Fetched random product from the database.");
        return productJPARepository.getRandomProduct().stream()
                .map(product -> product.toDomainModel())
                .collect(Collectors.toList());
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
    public List<Product> getProductsBetweenTwoDates(LocalDateTime startDate, LocalDateTime endDate) {
        return productJPARepository.findAllByExpirationDateTimeBetween(startDate, endDate).stream()
                .map(productEntity -> productEntity.toDomainModel())
                .collect(Collectors.toList());
    }
}
