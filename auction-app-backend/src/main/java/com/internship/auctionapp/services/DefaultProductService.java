package com.internship.auctionapp.services;

import com.internship.auctionapp.domainmodels.Product;
import com.internship.auctionapp.middleware.exception.ProductExpirationDateException;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.repositories.ProductRepository;
import com.internship.auctionapp.requests.CreateProductRequest;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DefaultProductService implements ProductService {
    private final ProductRepository productRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultProductService.class);
    
    private static final int DEFAULT_ELEMENTS_PER_PAGE = 8;

    private static final String LAST_CHANCE = "last-chance";

    private static final String EXPIRATION_DATE_TIME = "expirationDateTime";

    private static final String CREATION_DATE_TIME = "creationDateTime";

    public DefaultProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        LOGGER.info("Fetched products from the database.");
        return productRepository.findAll().stream().map(productEntity -> productEntity.toDomainModel())
                .collect(Collectors.toList());
    }

    @Override
    public Product addProduct(CreateProductRequest createProductRequest) {
        if (createProductRequest.getExpirationDateTime().isBefore(LocalDateTime.now())) {
            LOGGER.error("Product expiration date is before product creation date. Product={}", createProductRequest);
            throw new ProductExpirationDateException();
        }

        ProductEntity productEntity = new ProductEntity(createProductRequest.getName(),
                createProductRequest.getDescription(), createProductRequest.getImageURL(), createProductRequest.getPrice(),
                LocalDateTime.now(), createProductRequest.getExpirationDateTime());
        Product respondProduct = productRepository.save(productEntity).toDomainModel();

        LOGGER.info("Successfully added product={} to the database.", respondProduct);
        return respondProduct;
    }

    @Override
    public Product getSingleProduct(UUID id) {
        LOGGER.info("Fetched product from the database with the id={} ", id);
        return productRepository.findById(id).get().toDomainModel();
    }

    @Override
    public ProductEntity updateProduct(UUID id, ProductEntity product) {
        ProductEntity productForUpdate = productRepository.findById(id).get();
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.map(product, productForUpdate);
        LOGGER.info("Product with the id={} has been updated.", id);
        return productRepository.save(productForUpdate);
    }

    @Override
    public void deleteProduct(UUID id) {
        LOGGER.info("Successfully deleted product with the id={}", id);
        productRepository.deleteById(id);
    }

    @Override
    public Product getRandomProduct() {
        LOGGER.info("Fetched random product from the database.");
        return productRepository.getRandomProduct().toDomainModel();
    }

    @Override
    public Page<ProductEntity> getProductsByCriteria(String criteria) {
        final Pageable page = PageRequest.of(0, DEFAULT_ELEMENTS_PER_PAGE, criteria.equalsIgnoreCase(LAST_CHANCE) ?
                Sort.by(EXPIRATION_DATE_TIME).ascending() :
                Sort.by(CREATION_DATE_TIME).descending());

        LOGGER.info("Fetched page of 8 products from the database, based on criteria={} ", criteria);
        return productRepository.findAll(page);
    }
}
