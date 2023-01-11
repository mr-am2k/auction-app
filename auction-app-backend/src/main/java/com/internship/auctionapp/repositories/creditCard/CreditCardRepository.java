package com.internship.auctionapp.repositories.creditCard;

import com.internship.auctionapp.entities.CreditCardEntity;
import com.internship.auctionapp.requests.CreateCreditCardRequest;

import java.util.UUID;

public interface CreditCardRepository {
    CreditCardEntity addCreditCard(CreateCreditCardRequest createCreditCardRequest);

    CreditCardEntity getSingleCreditCard(UUID id);

    CreditCardEntity updateCreditCard(UUID id, CreateCreditCardRequest updateCreditCard);
}
