package com.internship.auctionapp.repositories.bid;

import com.internship.auctionapp.domainmodels.Bid;
import com.internship.auctionapp.entities.BidEntity;
import com.internship.auctionapp.entities.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BidJPARepository extends JpaRepository<BidEntity, UUID> {

    @Query(
            value = "SELECT price FROM bid b " +
                    "WHERE b.product_id = :productId " +
                    "ORDER BY b.price DESC " +
                    "LIMIT 1",
            nativeQuery = true
    )
    double highestBid(@Param("productId") UUID productId);

    List<BidEntity> getBidEntitiesByProduct(ProductEntity productEntity);
}
