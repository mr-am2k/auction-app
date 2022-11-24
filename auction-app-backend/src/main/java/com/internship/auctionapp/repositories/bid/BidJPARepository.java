package com.internship.auctionapp.repositories.bid;

import com.internship.auctionapp.entities.BidEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BidJPARepository extends JpaRepository<BidEntity, UUID> {

    BidEntity findTopByProductIdOrderByPriceDesc(@Param("productId") UUID productId);
}
