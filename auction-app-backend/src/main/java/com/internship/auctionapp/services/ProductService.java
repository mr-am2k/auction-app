package com.internship.auctionapp.services;

import com.internship.auctionapp.models.Product;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    List<Product> getAllProducts() throws Exception;

    Product addProduct(Product product);

    Product getSingleProduct(UUID id);

    Product updateProduct(UUID id, Product product);

    void deleteProduct(UUID id);

    Product getRandomProduct();

    List<Product> getProductsByCriteria(String oldOrNew);
}
