package com.internship.auctionapp.services.creditCard;

import com.internship.auctionapp.entities.CreditCardEntity;
import com.internship.auctionapp.requests.CreateCreditCardRequest;

import java.util.UUID;

public interface CreditCardService {
    CreditCardEntity addCreditCard(CreateCreditCardRequest createCreditCardRequest);

    CreditCardEntity getSingleCreditCard(UUID id);

    CreditCardEntity updateCreditCard(CreditCardEntity creditCard, CreateCreditCardRequest updateCreditCardRequest);
}
