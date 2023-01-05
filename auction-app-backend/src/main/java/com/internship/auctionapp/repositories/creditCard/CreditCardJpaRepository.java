package com.internship.auctionapp.repositories.creditCard;

import com.internship.auctionapp.entities.CreditCardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CreditCardJpaRepository extends JpaRepository<CreditCardEntity, UUID> {
}
