package com.internship.auctionapp.services.creditCard;

import com.internship.auctionapp.entities.CreditCardEntity;
import com.internship.auctionapp.repositories.creditCard.CreditCardRepository;
import com.internship.auctionapp.requests.CreateCreditCardRequest;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DefaultCreditCardService implements CreditCardService {
    private final CreditCardRepository creditCardRepository;

    public DefaultCreditCardService(CreditCardRepository creditCardRepository) {
        this.creditCardRepository = creditCardRepository;
    }

    @Override
    public CreditCardEntity addCreditCard(CreateCreditCardRequest createCreditCardRequest) {
        return creditCardRepository.addCreditCard(createCreditCardRequest);
    }

    @Override
    public CreditCardEntity getSingleCreditCard(UUID id) {
        return creditCardRepository.getSingleCreditCard(id);
    }

    @Override
    public CreditCardEntity updateCreditCard(CreditCardEntity creditCard, CreateCreditCardRequest updateCreditCardRequest) {
        return creditCard == null ?
                addCreditCard(updateCreditCardRequest) :
                creditCardRepository.updateCreditCard(creditCard.getId(), updateCreditCardRequest);
    }
}
