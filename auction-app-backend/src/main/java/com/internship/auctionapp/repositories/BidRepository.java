package com.internship.auctionapp.repositories;

import com.internship.auctionapp.models.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BidRepository extends JpaRepository<Bid, UUID> {

    @Query(
            value = "SELECT * FROM bid b WHERE b.product_id = :productId ",
            nativeQuery = true
    )
    List<Bid> getBidsByProductId(@Param("productId") UUID productId);
}
