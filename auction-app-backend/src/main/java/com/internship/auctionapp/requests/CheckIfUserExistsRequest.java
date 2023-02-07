package com.internship.auctionapp.requests;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CheckIfUserExistsRequest {
    private String email;
}
