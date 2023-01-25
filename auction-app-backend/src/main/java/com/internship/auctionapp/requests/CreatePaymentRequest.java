package com.internship.auctionapp.requests;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class CreatePaymentRequest {
    private UUID productId;

    private UUID creditCardId;

    private CreateCreditCardRequest createCreditCardRequest;
}
