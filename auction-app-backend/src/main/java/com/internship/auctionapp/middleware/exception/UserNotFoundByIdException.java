package com.internship.auctionapp.middleware.exception;

public class UserNotFoundByIdException extends RuntimeException {
    public UserNotFoundByIdException(String message) {
        super(message);
    }
}
