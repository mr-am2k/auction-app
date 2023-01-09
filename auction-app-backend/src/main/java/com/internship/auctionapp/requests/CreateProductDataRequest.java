package com.internship.auctionapp.requests;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateProductDataRequest {
    private CreateProductRequest createProductRequest;

    private CreateCreditCardRequest createCreditCardRequest;
}
