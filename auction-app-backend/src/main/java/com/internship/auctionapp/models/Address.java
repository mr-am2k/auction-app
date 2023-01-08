package com.internship.auctionapp.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class Address {
    private UUID id;

    private String street;

    private String city;

    private String zipCode;

    private String state;

    private String country;
}
