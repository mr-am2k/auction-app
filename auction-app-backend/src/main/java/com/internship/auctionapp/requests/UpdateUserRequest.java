package com.internship.auctionapp.requests;

import com.internship.auctionapp.entities.AddressEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.Date;

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

    private String profileImageUrl;

    private Date dateOfBirth;

    private AddressEntity address;
}
