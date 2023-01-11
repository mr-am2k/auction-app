package com.internship.auctionapp.middleware.exception;

public class CreditCardNotFoundException extends RuntimeException{
    public CreditCardNotFoundException(String message) {
        super(message);
    }
}
