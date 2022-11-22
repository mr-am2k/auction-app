package com.internship.auctionapp.services;

import com.internship.auctionapp.domainmodels.Product;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.requests.CreateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    List<Product> getAllProducts();

    Product addProduct(CreateProductRequest createProductRequest);

    Product getSingleProduct(UUID id);

    ProductEntity updateProduct(UUID id, ProductEntity product);

    void deleteProduct(UUID id);

    Product getRandomProduct();

    Page<Product> getProductsByCriteria(String criteria);
}
