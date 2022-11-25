package com.internship.auctionapp.services;

import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.middleware.exception.ProductExpirationDateException;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.repositories.product.ProductRepository;
import com.internship.auctionapp.requests.CreateProductRequest;
import com.internship.auctionapp.util.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DefaultProductService implements ProductService {
    private final ProductRepository productRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultProductService.class);

    public DefaultProductService(ProductRepository productCRUDRepository) {
        this.productRepository = productCRUDRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.getAllProducts();

    }

    @Override
    public Product addProduct(CreateProductRequest createProductRequest) {
        if (DateUtils.isInPast(createProductRequest.getExpirationDateTime())) {
            LOGGER.error("Product expiration date is before product creation date. Product={}", createProductRequest);

            throw new ProductExpirationDateException();
        }

        return productRepository.addProduct(createProductRequest);
    }

    @Override
    public Product getSingleProduct(UUID id) {
        return productRepository.getSingleProduct(id);
    }

    @Override
    public Product updateProduct(UUID id, ProductEntity product) {
        return productRepository.updateProduct(id, product);
    }

    @Override
    public void deleteProduct(UUID id) {
        productRepository.deleteProduct(id);
    }

    @Override
    public Product getRandomProduct() {
        return productRepository.getRandomProduct();
    }

    @Override
    public Page<Product> getProductsByCriteria(String criteria) {
        return productRepository.getProductsByCriteria(criteria);
    }
}
