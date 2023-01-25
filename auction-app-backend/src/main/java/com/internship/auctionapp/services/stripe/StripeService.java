package com.internship.auctionapp.services.stripe;

import com.internship.auctionapp.entities.CreditCardEntity;
import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.requests.CreatePaymentRequest;
import com.stripe.exception.StripeException;

public interface StripeService {
    String createCustomer(UserEntity user) throws StripeException;

    void completePayment(Integer amount, String customerId, String creditCardId, CreatePaymentRequest createPaymentRequest) throws StripeException;

    String createCard(CreditCardEntity creditCard, String stripeCustomerId) throws StripeException;
}
