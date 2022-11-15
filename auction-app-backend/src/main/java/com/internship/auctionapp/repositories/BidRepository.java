package com.internship.auctionapp.repositories;

import com.internship.auctionapp.models.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BidRepository extends JpaRepository<Bid, UUID> {
}
