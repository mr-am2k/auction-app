package com.internship.auctionapp.models;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CompletePayment {
    private Integer amount;

    private String customerId;

    private String creditCardId;
}
