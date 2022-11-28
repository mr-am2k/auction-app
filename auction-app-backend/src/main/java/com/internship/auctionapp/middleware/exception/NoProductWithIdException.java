package com.internship.auctionapp.middleware.exception;

public class NoProductWithIdException extends RuntimeException {
    public NoProductWithIdException(String message) {
        super(message);
    }
}
