package com.internship.auctionapp.middleware.exception;

public class InvalidCategoryIdException extends RuntimeException{
    public InvalidCategoryIdException(String message) {
        super(message);
    }
}
