package com.internship.auctionapp.requests;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class UpdateCardRequest {
    private String holderName;

    private String number;

    private Date expirationDate;

    private String verificationValue;
}
