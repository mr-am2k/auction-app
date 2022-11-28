package com.internship.auctionapp.middleware.exception;

public class NoBidWithIdException extends RuntimeException{
    public NoBidWithIdException(String message) {
        super(message);
    }
}
