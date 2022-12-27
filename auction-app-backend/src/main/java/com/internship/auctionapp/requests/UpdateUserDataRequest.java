package com.internship.auctionapp.requests;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateUserDataRequest {
    private UpdateUserRequest updateUserRequest;

    private UpdateCardRequest updateCardRequest;
}
