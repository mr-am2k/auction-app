package com.internship.auctionapp.middleware.exception;

public class BidNotFoundException extends RuntimeException{
    public BidNotFoundException(String id) {
        super(id);
    }
}
