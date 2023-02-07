package com.internship.auctionapp.requests;

import com.internship.auctionapp.util.AuthenticationProvider;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class UserRegisterRequest {
    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String email;

    @NotBlank
    private String role;

    private String password;

    @NotBlank
    private AuthenticationProvider authenticationProvider;
}
