package com.internship.auctionapp.repositories.payment;

import com.internship.auctionapp.entities.PaymentEntity;
import com.internship.auctionapp.util.PaymentRelatedEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PaymentJpaRepository extends JpaRepository<PaymentEntity, UUID> {
    boolean existsByRelatedEntityIdAndPaymentRelatedEntity(UUID productId, PaymentRelatedEntity paymentRelatedEntity);
}
