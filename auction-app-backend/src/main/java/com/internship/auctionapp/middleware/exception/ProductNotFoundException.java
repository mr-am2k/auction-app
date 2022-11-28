package com.internship.auctionapp.middleware.exception;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(String id) {
        super(id);
    }
}
