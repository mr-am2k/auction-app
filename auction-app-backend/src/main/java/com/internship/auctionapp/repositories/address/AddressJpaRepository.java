package com.internship.auctionapp.repositories.address;

import com.internship.auctionapp.entities.AddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AddressJpaRepository extends JpaRepository<AddressEntity, UUID> {}
