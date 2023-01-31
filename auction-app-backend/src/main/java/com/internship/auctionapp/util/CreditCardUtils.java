package com.internship.auctionapp.util;

import com.internship.auctionapp.entities.CreditCardEntity;
import com.internship.auctionapp.requests.CreateCreditCardRequest;

public class CreditCardUtils {
    public static boolean compare(CreditCardEntity creditCard, CreateCreditCardRequest createCreditCardRequest) {
        return creditCard.getHolderFullName().equalsIgnoreCase(createCreditCardRequest.getHolderFullName())
                && creditCard.getNumber().equalsIgnoreCase(createCreditCardRequest.getNumber())
                && creditCard.getVerificationValue().equalsIgnoreCase(createCreditCardRequest.getVerificationValue());
    }
}
