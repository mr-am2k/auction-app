package com.internship.auctionapp.repositories.creditCard;

import com.internship.auctionapp.entities.CreditCardEntity;
import com.internship.auctionapp.middleware.exception.CreditCardNotFoundException;
import com.internship.auctionapp.requests.CreateCreditCardRequest;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public class DefaultCreditCardRepository implements CreditCardRepository {
    private final CreditCardJpaRepository creditCardJpaRepository;

    public DefaultCreditCardRepository(CreditCardJpaRepository creditCardJpaRepository) {
        this.creditCardJpaRepository = creditCardJpaRepository;
    }

    @Override
    public CreditCardEntity addCreditCard(CreateCreditCardRequest createCreditCardRequest) {
        CreditCardEntity creditCardEntity = new CreditCardEntity();

        creditCardEntity.setHolderFullName(createCreditCardRequest.getHolderFullName());
        creditCardEntity.setNumber(createCreditCardRequest.getNumber());
        creditCardEntity.setExpirationDate(createCreditCardRequest.getExpirationDate());
        creditCardEntity.setVerificationValue(createCreditCardRequest.getVerificationValue());

        return creditCardJpaRepository.save(creditCardEntity);
    }

    @Override
    public CreditCardEntity getSingleCreditCard(UUID id) {
        return creditCardJpaRepository.findById(id).orElseThrow(() -> new CreditCardNotFoundException(id.toString()));
    }

    @Override
    public CreditCardEntity updateCreditCard(UUID id, CreateCreditCardRequest updateCreditCardRequest) {
        CreditCardEntity existingCreditCard = getSingleCreditCard(id);

        existingCreditCard.setHolderFullName(updateCreditCardRequest.getHolderFullName());
        existingCreditCard.setNumber(updateCreditCardRequest.getNumber());
        existingCreditCard.setExpirationDate(updateCreditCardRequest.getExpirationDate());
        existingCreditCard.setVerificationValue(updateCreditCardRequest.getVerificationValue());

        return creditCardJpaRepository.save(existingCreditCard);
    }
}
