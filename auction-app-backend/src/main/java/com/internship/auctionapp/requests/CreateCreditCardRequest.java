package com.internship.auctionapp.requests;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class UpdateCreditCardRequest {
    private String holderFullName;

    private String number;

    private Date expirationDate;

    private String verificationValue;
}
