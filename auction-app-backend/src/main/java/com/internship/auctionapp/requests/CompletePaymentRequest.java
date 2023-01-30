package com.internship.auctionapp.requests;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CompletePaymentRequest {
    private Integer amount;

    private String customerId;

    private String creditCardId;
}
