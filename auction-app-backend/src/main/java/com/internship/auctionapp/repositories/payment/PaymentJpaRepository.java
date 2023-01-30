package com.internship.auctionapp.repositories.payment;

import com.internship.auctionapp.entities.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PaymentJpaRepository extends JpaRepository<PaymentEntity, UUID> {
    boolean existsByProductId(UUID productId);
}
