package com.internship.auctionapp.requests;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
public class UserLoginRequest {
    @NotBlank
    @Size(max = 50)
    @Email(message = "Please provide valid email address")
    private String email;

    @NotBlank
    @Size(min = 8)
    private String password;
}
