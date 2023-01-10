package com.internship.auctionapp.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Embeddable
public class AddressEntity {
    private String street;

    private String city;

    private String zipCode;

    private String state;

    private String country;
}
