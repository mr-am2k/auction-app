package com.internship.auctionapp.repositories;

import com.internship.auctionapp.entities.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, UUID> {

    @Query(
            value = "SELECT * FROM Product ORDER BY random() LIMIT 1",
            nativeQuery = true
    )
    ProductEntity getRandomProduct();

}
