package com.internship.auctionapp.middleware.exception;

public class UserNotFoundByUsernameException extends RuntimeException {
    public UserNotFoundByUsernameException(String message) {
        super(message);
    }
}
