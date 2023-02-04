package com.internship.auctionapp.middleware.exception;

public class SubcategoryHasProductsException extends RuntimeException {
    public SubcategoryHasProductsException(String message) {
        super(message);
    }
}
