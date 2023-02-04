package com.internship.auctionapp.middleware.exception;

public class SubcategoriesExistException extends RuntimeException {
    public SubcategoriesExistException(String message) {
        super(message);
    }
}
