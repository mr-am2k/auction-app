package com.internship.auctionapp.repositories.card;

import com.internship.auctionapp.entities.CardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CardJpaRepository extends JpaRepository<CardEntity, UUID> {
}
