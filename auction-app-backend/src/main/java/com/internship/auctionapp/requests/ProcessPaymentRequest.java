package com.internship.auctionapp.models;

import com.internship.auctionapp.entities.CreditCardEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProcessPayment {
    private String stripeCardId;

    private CreditCardEntity creditCard;
}
