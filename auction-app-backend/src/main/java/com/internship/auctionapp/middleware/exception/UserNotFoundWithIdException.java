package com.internship.auctionapp.middleware.exception;

public class UserNotFoundWithIdException extends RuntimeException {
    public UserNotFoundWithIdException(String message) {
        super(message);
    }
}
