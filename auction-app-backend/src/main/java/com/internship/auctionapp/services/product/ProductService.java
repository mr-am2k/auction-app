package com.internship.auctionapp.services.product;

import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.requests.CreateProductRequest;

import org.springframework.boot.web.server.Http2;
import org.springframework.data.domain.Page;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;

public interface ProductService {
    List<Product> getAllProducts();

    Product addProduct(CreateProductRequest createProductRequest);

    Product getSingleProduct(UUID id);

    Product updateProduct(UUID id, ProductEntity product);

    void deleteProduct(UUID id);

    Page<Product> getRandomProduct();

    Page<Product> getProductsByCriteria(String criteria);

    List<Product> getProductsForUser(HttpServletRequest request);

    void createNotificationsAfterProductExpires();
}
