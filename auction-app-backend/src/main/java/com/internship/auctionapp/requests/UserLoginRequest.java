package com.internship.auctionapp.requests;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
public class UserLoginRequest {
    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
