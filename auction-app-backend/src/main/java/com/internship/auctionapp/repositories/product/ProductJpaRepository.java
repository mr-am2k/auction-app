package com.internship.auctionapp.repositories.product;

import com.internship.auctionapp.entities.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface ProductJpaRepository extends JpaRepository<ProductEntity, UUID> {
    @Query(
            value = "SELECT * FROM products ORDER BY random() LIMIT 1",
            nativeQuery = true
    )
    ProductEntity getRandomProduct();

    List<ProductEntity> findAllByExpirationDateTimeBetween(
            ZonedDateTime startDate,
            ZonedDateTime endDate
    );
}
