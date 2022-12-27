package com.internship.auctionapp.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
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

    private String role;

    private boolean isActive;

    private String imageUrl;

    private Date dateOfBirth;

    private String street;

    private String city;

    private String zipCode;

    private String state;

    private String country;

    private Card card;
}
