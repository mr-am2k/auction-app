package com.internship.auctionapp.requests;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateAddressRequest {
    private String street;

    private String city;

    private String zipCode;

    private String state;

    private String country;
}
