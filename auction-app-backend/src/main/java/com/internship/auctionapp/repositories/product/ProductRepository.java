package com.internship.auctionapp.repositories.product;

import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.requests.CreateProductRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.ZonedDateTime;

import java.util.List;
import java.util.UUID;

public interface ProductRepository {
    List<Product> getAllProducts();

    Product addProduct(CreateProductRequest createProductRequest, String username);

    Product getSingleProduct(UUID id);

    Product updateProduct(UUID id, ProductEntity product);

    void deleteProduct(UUID id);

    Page<Product> getRandomProduct(Pageable page);

    Page<Product> getProductsByCriteria(Pageable page);

    List<Product> getProductsBetweenTwoDates(ZonedDateTime startDate, ZonedDateTime endDate);

    List<Product> getProductsForUser(String username);
}
