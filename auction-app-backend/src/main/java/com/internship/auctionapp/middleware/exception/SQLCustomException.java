package com.internship.auctionapp.middleware.exception;

public class SQLCustomException extends RuntimeException {

    public SQLCustomException(String message) {
        super(message);
    }
}
