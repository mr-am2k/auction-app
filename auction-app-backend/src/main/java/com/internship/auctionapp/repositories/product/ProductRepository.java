package com.internship.auctionapp.repositories.product;

import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.requests.CreateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface ProductRepository {
    List<ProductEntity> getAllProducts() throws Exception;

    ProductEntity addProduct(CreateProductRequest createProductRequest);

    ProductEntity getSingleProduct(UUID id);

    ProductEntity updateProduct(UUID id, ProductEntity product);

    void deleteProduct(UUID id);

    ProductEntity getRandomProduct();

    Page<ProductEntity> getProductsByCriteria(String criteria);
}
