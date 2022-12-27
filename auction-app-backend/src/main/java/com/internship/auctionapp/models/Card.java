package com.internship.auctionapp.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
public class Card {
    private UUID id;

    private String holderName;

    private String number;

    private Date expirationDate;

    private String verificationValue;
}
