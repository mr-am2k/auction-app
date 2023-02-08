package com.internship.auctionapp.util;

import com.internship.auctionapp.entities.CreditCardEntity;
import com.internship.auctionapp.models.CreditCard;
import com.internship.auctionapp.requests.CreateCreditCardRequest;

public class CreditCardUtils {
    public static boolean compare(CreditCardEntity creditCard, CreateCreditCardRequest createCreditCardRequest) {
        return creditCard.getHolderFullName().equalsIgnoreCase(createCreditCardRequest.getHolderFullName())
                && creditCard.getNumber().equalsIgnoreCase(createCreditCardRequest.getNumber())
                && creditCard.getVerificationValue().equalsIgnoreCase(createCreditCardRequest.getVerificationValue());
    }

    public static boolean isValid(CreditCard creditCard){
        return creditCard.getHolderFullName() != null &&
                creditCard.getNumber() != null &&
                creditCard.getExpirationDate() != null &&
                creditCard.getVerificationValue() != null;
    }
}
