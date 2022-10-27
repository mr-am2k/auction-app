package com.internship.auctionapp.services;

import com.internship.auctionapp.models.Product;

import java.util.List;

public interface ProductService  {
    List<Product> getAllProducts();

    Product addProduct(Product product);
}
