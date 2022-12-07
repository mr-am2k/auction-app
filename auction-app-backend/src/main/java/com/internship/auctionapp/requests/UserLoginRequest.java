package com.internship.auctionapp.requests;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class UserLoginRequest {
    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
