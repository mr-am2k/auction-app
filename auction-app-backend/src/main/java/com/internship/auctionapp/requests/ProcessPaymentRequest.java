package com.internship.auctionapp.requests;

import com.internship.auctionapp.entities.CreditCardEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProcessPaymentRequest {
    private String stripeCardId;

    private CreditCardEntity creditCard;
}
