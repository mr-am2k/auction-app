package com.internship.auctionapp.repositories.payment;

import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.models.Payment;

import java.util.UUID;

public interface PaymentRepository {
    Payment addPayment(Integer amount, UserEntity user, ProductEntity product, UUID creditCardId);

    boolean isPaid(UUID productId);
}
