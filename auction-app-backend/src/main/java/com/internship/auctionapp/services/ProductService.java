package com.internship.auctionapp.services;

import com.internship.auctionapp.entities.ProductEntity;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    List<ProductEntity> getAllProducts() throws Exception;

    ProductEntity addProduct(ProductEntity product);

    ProductEntity getSingleProduct(UUID id);

    ProductEntity updateProduct(UUID id, ProductEntity product);

    void deleteProduct(UUID id);

    ProductEntity getRandomProduct();

    Page<ProductEntity> getProductsByCriteria(String criteria);
}
