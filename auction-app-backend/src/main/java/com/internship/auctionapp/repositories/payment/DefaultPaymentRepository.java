package com.internship.auctionapp.repositories.payment;

import com.internship.auctionapp.entities.CreditCardEntity;
import com.internship.auctionapp.entities.PaymentEntity;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.middleware.exception.CreditCardNotFoundException;
import com.internship.auctionapp.models.Payment;
import com.internship.auctionapp.repositories.creditCard.CreditCardJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public class DefaultPaymentRepository implements PaymentRepository {
    private final PaymentJpaRepository paymentJpaRepository;

    private final CreditCardJpaRepository creditCardJpaRepository;

    public DefaultPaymentRepository(PaymentJpaRepository paymentJpaRepository,
                                    CreditCardJpaRepository creditCardJpaRepository
    ) {
        this.paymentJpaRepository = paymentJpaRepository;
        this.creditCardJpaRepository = creditCardJpaRepository;
    }

    @Override
    public Payment addPayment(Integer amount, UserEntity user, ProductEntity product, UUID creditCardId) {
        PaymentEntity payment = new PaymentEntity();

        CreditCardEntity creditCard = creditCardJpaRepository.findById(creditCardId).orElseThrow(() -> new CreditCardNotFoundException(creditCardId.toString()));

        payment.setAmount(amount);
        payment.setProduct(product);
        payment.setUser(user);
        payment.setCreditCard(creditCard);

        return paymentJpaRepository.save(payment).toDomainModel();
    }

    @Override
    public boolean isPaid(UUID productId) {
        return paymentJpaRepository.existsByProductId(productId);
    }
}
