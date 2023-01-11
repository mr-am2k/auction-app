package com.internship.auctionapp.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class LoginResponse {
    private String accessToken;

    private String refreshToken;

    private String type = "Bearer";

    private UUID id;

    private String email;

    private String fullName;

    private List<String> roles;

    public LoginResponse(String accessToken, String refreshToken, UUID id, String email, String fullName, List<String> roles) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.roles = roles;
    }
}
