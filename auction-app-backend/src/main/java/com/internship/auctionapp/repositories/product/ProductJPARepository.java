package com.internship.auctionapp.repositories.product;

import com.internship.auctionapp.entities.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface ProductJPARepository extends JpaRepository<ProductEntity, UUID> {

    @Query(
            value = "SELECT * FROM products ORDER BY random() LIMIT 1",
            nativeQuery = true
    )
    List<ProductEntity> getRandomProduct();

    List<ProductEntity> findAllByExpirationDateTimeBetween(LocalDateTime startDate, LocalDateTime endDate);
}
