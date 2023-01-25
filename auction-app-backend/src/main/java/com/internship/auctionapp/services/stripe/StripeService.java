package com.internship.auctionapp.services.stripe;

import com.internship.auctionapp.entities.UserEntity;
import com.stripe.exception.StripeException;

public interface StripeService {
    public String createCustomer(UserEntity user) throws StripeException;
}
