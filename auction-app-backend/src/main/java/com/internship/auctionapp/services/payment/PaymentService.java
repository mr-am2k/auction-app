package com.internship.auctionapp.services.payment;

import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.models.Payment;
import com.internship.auctionapp.requests.CreatePaymentRequest;
import com.stripe.exception.StripeException;

public interface PaymentService {
    Payment completePayment(UserEntity user, ProductEntity product, CreatePaymentRequest createPaymentRequest) throws StripeException;
}
