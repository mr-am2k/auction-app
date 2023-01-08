package com.internship.auctionapp.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
public class User {
    private UUID id;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String profileImageUrl;

    private Date dateOfBirth;

    private Address address;

    private CreditCard card;
}
