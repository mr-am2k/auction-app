package com.internship.auctionapp.services.payment;

import com.internship.auctionapp.models.Payment;
import com.internship.auctionapp.requests.CreatePaymentRequest;
import com.stripe.exception.StripeException;

public interface PaymentService {
    Payment purchase(String username, CreatePaymentRequest createPaymentRequest) throws StripeException;
}
