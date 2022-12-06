package com.internship.auctionapp.requests;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
public class UserRegisterRequest {
    @NotBlank
    @Size(min = 2, max = 50)
    private String firstName;

    @NotBlank
    @Size(min = 2, max = 50)
    private String lastName;

    @NotBlank
    @Size(max = 50)
    @Email(message = "Please provide valid email address")
    private String email;

    @NotBlank
    @Size(max = 10)
    private String role;

    @NotBlank
    @Size(min = 8)
    private String password;
}
