package com.internship.auctionapp.services.product;

import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.requests.CreateProductDataRequest;
import com.internship.auctionapp.requests.CreateProductRequest;

import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    List<Product> getAllProducts();

    Product addProduct(CreateProductDataRequest createProductDataRequest);

    Product getSingleProduct(UUID id);

    Product updateProduct(UUID id, ProductEntity product);

    void deleteProduct(UUID id);

    Page<Product> getRandomProduct();

    Page<Product> getProductsByCriteria(String criteria);

    List<Product> getUserProducts(UUID userId);

    Page<Product> getRelatedProducts(UUID categoryId, UUID productId);

    void createNotificationsAfterProductExpires();
}
