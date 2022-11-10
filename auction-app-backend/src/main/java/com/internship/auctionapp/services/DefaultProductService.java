package com.internship.auctionapp.services;

import com.internship.auctionapp.middleware.exception.ProductExpirationDateException;
import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.repositories.ProductRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

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
        return productRepository.findAll();
    }

    @Override
    public Product addProduct(Product product) {
        if (product.getExpirationDateTime().isBefore(product.getCreationDateTime())) {
            LOGGER.error("Product expiration date is before product creation date. Product={}", product);
            throw new ProductExpirationDateException();
        }
        LOGGER.info("Successfully added product={} to the database.", product);
        return productRepository.save(product);
    }

    @Override
    public Product getSingleProduct(UUID id) {
        LOGGER.info("Fetched product from the database with the id={} ", id);
        return productRepository.findById(id).get();
    }

    @Override
    public Product updateProduct(UUID id, Product product) {
        Product productForUpdate = productRepository.findById(id).get();
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
        return productRepository.getRandomProduct();
    }

    @Override
    public Page<Product> getProductsByCriteria(String criteria) {
        final Pageable page = PageRequest.of(0, DEFAULT_ELEMENTS_PER_PAGE, criteria.equalsIgnoreCase(LAST_CHANCE) ?
                Sort.by(EXPIRATION_DATE_TIME).ascending() :
                Sort.by(CREATION_DATE_TIME).descending());
        LOGGER.info("Fetched page of 8 products from the database, based on criteria={} ", criteria);
        return productRepository.findAll(page);
    }
}
