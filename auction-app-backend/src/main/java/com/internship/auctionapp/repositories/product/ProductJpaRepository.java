package com.internship.auctionapp.repositories.product;

import com.internship.auctionapp.entities.ProductEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductJpaRepository extends JpaRepository<ProductEntity, UUID> {
    List<ProductEntity> findAllByExpirationDateTimeBetween(
            ZonedDateTime startDate,
            ZonedDateTime endDate
    );

    List<ProductEntity> findAllByUserId(UUID id);

    Page<ProductEntity> findAllByExpirationDateTimeAfter(ZonedDateTime expirationDateTime, Pageable page);

    Page<ProductEntity> findAllByCategoryIdAndIdNot(UUID categoryId, UUID productId, Pageable page);
}
