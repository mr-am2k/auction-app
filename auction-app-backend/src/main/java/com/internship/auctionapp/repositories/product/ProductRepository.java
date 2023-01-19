package com.internship.auctionapp.repositories.product;

import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.requests.CreateProductDataRequest;

import com.internship.auctionapp.util.filter.ProductFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.ZonedDateTime;

import java.util.List;
import java.util.UUID;

public interface ProductRepository {
    Page<Product> getProducts(ProductFilter productFilter, Integer pageNumber);

    Product addProduct(CreateProductDataRequest createProductDataRequest);

    Product getSingleProduct(UUID id);

    Product updateProduct(UUID id, ProductEntity product);

    void deleteProduct(UUID id);

    Page<Product> getRandomProduct(Pageable page);

    Page<Product> getProductsByCriteria(Pageable page);

    List<Product> getProductsBetweenTwoDates(ZonedDateTime startDate, ZonedDateTime endDate);

    List<Product> getUserProducts(UUID userId);

    Page<Product> getRelatedProducts(UUID categoryId,UUID productId, Pageable page);
}
