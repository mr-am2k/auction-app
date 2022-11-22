package com.internship.auctionapp.repositories.product;

import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.requests.CreateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface ProductRepository {
    List<Product> getAllProducts();

    Product addProduct(CreateProductRequest createProductRequest);

    List<Product> getSingleProduct(UUID id);

    Product updateProduct(UUID id, ProductEntity product);

    void deleteProduct(UUID id);

    List<Product> getRandomProduct();

    Page<Product> getProductsByCriteria(String criteria);
}
