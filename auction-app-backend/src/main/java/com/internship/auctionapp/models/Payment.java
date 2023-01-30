package com.internship.auctionapp.models;

import com.internship.auctionapp.entities.CreditCardEntity;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.entities.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {
    private UUID id;

    private Integer amount;

    private LocalDateTime paymentTime;

    private ProductEntity product;

    private UserEntity user;

    private CreditCardEntity creditCard;
}
