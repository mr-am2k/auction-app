package com.internship.auctionapp.repositories;

import com.internship.auctionapp.entities.BidEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BidRepository extends JpaRepository<BidEntity, UUID> {

    @Query(
            value = "SELECT price FROM bid b " +
                    "WHERE b.product_id = :productId " +
                    "ORDER BY b.price DESC " +
                    "LIMIT 1",
            nativeQuery = true
    )
    double highestBid(@Param("productId") UUID productId);
}
