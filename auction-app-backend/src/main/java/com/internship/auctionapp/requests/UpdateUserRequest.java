package com.internship.auctionapp.requests;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
public class UpdateUserRequest {
    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String email;

    private String phoneNumber;

    private String imageUrl;

    private Date dateOfBirth;

    private String street;

    private String city;

    private String zipCode;

    private String state;

    private String country;
}
