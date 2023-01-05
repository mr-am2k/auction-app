package com.internship.auctionapp.repositories.category;

import com.internship.auctionapp.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoryJpaRepository extends JpaRepository<CategoryEntity, UUID> {
    boolean existsById(UUID id);
}
