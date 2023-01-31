package com.internship.auctionapp.services.payment;

import com.internship.auctionapp.entities.CreditCardEntity;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.middleware.exception.CreditCardNotFoundException;
import com.internship.auctionapp.middleware.exception.StripeCreditCardException;
import com.internship.auctionapp.middleware.exception.StripePaymentException;
import com.internship.auctionapp.middleware.exception.StripeUserException;
import com.internship.auctionapp.requests.CompletePaymentRequest;
import com.internship.auctionapp.models.Payment;
import com.internship.auctionapp.requests.ProcessPaymentRequest;
import com.internship.auctionapp.repositories.bid.BidRepository;
import com.internship.auctionapp.repositories.creditCard.CreditCardJpaRepository;
import com.internship.auctionapp.repositories.payment.PaymentRepository;
import com.internship.auctionapp.repositories.product.ProductJpaRepository;
import com.internship.auctionapp.repositories.user.UserJpaRepository;
import com.internship.auctionapp.requests.CreatePaymentRequest;
import com.internship.auctionapp.util.CreditCardUtils;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Card;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import com.stripe.model.Token;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/***
 * PaymentService works with Stripe to process payments.
 * This is the process:
 * First we need to create customer on Stripe, if user hasn't paid before we call registerUser method which will
 * create new user on Stripe, and we will link that account with user account in our app.
 *
 * If user has paid before we will just take id of his Stripe profile which is linked to his account in our app.
 *
 * After that we need to link credit card.
 *
 * If user doesn't have card link to his account we create new Stripe card with data that he gave us and link it to his account.
 *
 * If he has card link to account we check if card data that he gave us are same as one that he has linked to his account.
 *
 * If they are the same, we check is his card registered on Stripe, if it's not we create new one using registerCreditCard method
 * and link it to the credit card in our app, if he has credit card linked to Stripe, we just take stripe credit card id.
 *
 * If cards aren't the same, we create new card, register it on stripe and save it in out database.
 *
 * At the end, we complete payment with the highest bid amount, users stripe account id and his stipe credit card id.
 */

@Service
public class DefaultPaymentService implements PaymentService {
    @Value("${app.stripe_secret_key}")
    private String STRIPE_API_KEY;

    private final String DEFAULT_CURRENCY = "USD";

    @PostConstruct
    public void init() {
        Stripe.apiKey = STRIPE_API_KEY;
    }

    private final BidRepository bidRepository;

    private final UserJpaRepository userJpaRepository;

    private final CreditCardJpaRepository creditCardJpaRepository;

    private final ProductJpaRepository productJpaRepository;

    private final PaymentRepository paymentRepository;

    public DefaultPaymentService(BidRepository bidRepository,
                                 UserJpaRepository userJpaRepository,
                                 CreditCardJpaRepository creditCardJpaRepository,
                                 ProductJpaRepository productJpaRepository, PaymentRepository paymentRepository) {
        this.bidRepository = bidRepository;
        this.userJpaRepository = userJpaRepository;
        this.creditCardJpaRepository = creditCardJpaRepository;
        this.productJpaRepository = productJpaRepository;
        this.paymentRepository = paymentRepository;
    }

    @Override
    public Payment completePayment(UserEntity user, ProductEntity product, CreatePaymentRequest createPaymentRequest) {
        String stripeCustomerId = null;

        if (user.getStripeCustomerId() == null) {
            String userId = registerUser(user);
            user.setStripeCustomerId(userId);
            userJpaRepository.save(user);
            stripeCustomerId = userId;
        } else {
            stripeCustomerId = user.getStripeCustomerId();
        }

        final Integer highestBidPrice = Double.valueOf(Math.round(bidRepository.getHighestBid(product.getId()).getPrice() * 100)).intValue();

        ProcessPaymentRequest processPaymentRequest = createPaymentRequest.getCreditCardId() == null ?
                processPaymentForUserWithoutCreditCard(createPaymentRequest, user, stripeCustomerId) :
                processPaymentForUserWithCreditCard(createPaymentRequest, stripeCustomerId);

        final CompletePaymentRequest completePaymentRequest = new CompletePaymentRequest();

        completePaymentRequest.setAmount(highestBidPrice);
        completePaymentRequest.setCustomerId(stripeCustomerId);
        completePaymentRequest.setCreditCardId(processPaymentRequest.getStripeCardId());

        completePayment(completePaymentRequest);

        return paymentRepository.addPayment(completePaymentRequest.getAmount(), user, product, processPaymentRequest.getCreditCard().getId());
    }

    private ProcessPaymentRequest processPaymentForUserWithoutCreditCard(CreatePaymentRequest createPaymentRequest, UserEntity user, String stripeCustomerId) {
        CreditCardEntity creditCard = new CreditCardEntity();

        creditCard.setHolderFullName(createPaymentRequest.getCreateCreditCardRequest().getHolderFullName());
        creditCard.setNumber(createPaymentRequest.getCreateCreditCardRequest().getNumber());
        creditCard.setExpirationDate(createPaymentRequest.getCreateCreditCardRequest().getExpirationDate());
        creditCard.setVerificationValue(createPaymentRequest.getCreateCreditCardRequest().getVerificationValue());

        final String stripeCreditCardId = registerCreditCard(creditCard, stripeCustomerId);

        creditCard.setStripeCreditCardId(stripeCreditCardId);

        final ProcessPaymentRequest processPaymentRequest = new ProcessPaymentRequest();
        processPaymentRequest.setStripeCardId(stripeCreditCardId);

        if (user.getCreditCard() == null) {
            final CreditCardEntity userCreditCard = creditCardJpaRepository.save(creditCard);

            user.setCreditCard(userCreditCard);
            userJpaRepository.save(user);
            processPaymentRequest.setCreditCard(userCreditCard);
        }

        return processPaymentRequest;
    }

    private ProcessPaymentRequest processPaymentForUserWithCreditCard(CreatePaymentRequest createPaymentRequest, String stripeCustomerId) {
        CreditCardEntity creditCard = creditCardJpaRepository.findById(createPaymentRequest.getCreditCardId()).orElseThrow(() ->
                new CreditCardNotFoundException(createPaymentRequest.getCreditCardId().toString())
        );

        String stripeCreditCardId;

        final ProcessPaymentRequest processPaymentRequest = new ProcessPaymentRequest();

        if (CreditCardUtils.compare(creditCard, createPaymentRequest.getCreateCreditCardRequest())) {

            if (creditCard.getStripeCreditCardId() == null) {
                CreditCardEntity creditCardModel = new CreditCardEntity();

                creditCardModel.setHolderFullName(createPaymentRequest.getCreateCreditCardRequest().getHolderFullName());
                creditCardModel.setNumber(createPaymentRequest.getCreateCreditCardRequest().getNumber());
                creditCardModel.setExpirationDate(createPaymentRequest.getCreateCreditCardRequest().getExpirationDate());
                creditCardModel.setVerificationValue(createPaymentRequest.getCreateCreditCardRequest().getVerificationValue());

                stripeCreditCardId = registerCreditCard(creditCardModel, stripeCustomerId);

                creditCard.setStripeCreditCardId(stripeCreditCardId);

                CreditCardEntity savedCreditCard = creditCardJpaRepository.save(creditCard);

                processPaymentRequest.setStripeCardId(stripeCreditCardId);
                processPaymentRequest.setCreditCard(savedCreditCard);
            } else {
                processPaymentRequest.setStripeCardId(creditCard.getStripeCreditCardId());
                processPaymentRequest.setCreditCard(creditCard);
            }
        } else {
            CreditCardEntity creditCardModel = new CreditCardEntity();

            creditCardModel.setHolderFullName(createPaymentRequest.getCreateCreditCardRequest().getHolderFullName());
            creditCardModel.setNumber(createPaymentRequest.getCreateCreditCardRequest().getNumber());
            creditCardModel.setExpirationDate(createPaymentRequest.getCreateCreditCardRequest().getExpirationDate());
            creditCardModel.setVerificationValue(createPaymentRequest.getCreateCreditCardRequest().getVerificationValue());

            stripeCreditCardId = registerCreditCard(creditCardModel, stripeCustomerId);

            final CreditCardEntity savedCreditCard = creditCardJpaRepository.save(creditCardModel);

            processPaymentRequest.setStripeCardId(stripeCreditCardId);
            processPaymentRequest.setCreditCard(savedCreditCard);
        }

        return processPaymentRequest;
    }

    private String registerUser(UserEntity user) {
        Map<String, Object> customerParams = new HashMap<>();

        customerParams.put("name", user.getFullName());
        customerParams.put("email", user.getEmail());
        customerParams.put("description", "Customer for: " + user.getFullName());

        Customer customer = null;
        try {
            customer = Customer.create(customerParams);
        } catch (StripeException e) {
            throw new StripeUserException();
        }

        return customer.getId();
    }

    private void completePayment(CompletePaymentRequest completePaymentRequest) {
        Map<String, Object> chargeParams = new HashMap<>();

        chargeParams.put("amount", completePaymentRequest.getAmount());
        chargeParams.put("currency", DEFAULT_CURRENCY);
        chargeParams.put("description", "Charge for user: " + completePaymentRequest.getCustomerId());
        chargeParams.put("customer", completePaymentRequest.getCustomerId());
        chargeParams.put("source", completePaymentRequest.getCreditCardId());

        try {
            Charge.create(chargeParams);
        } catch (StripeException e) {
            throw new StripePaymentException();
        }
    }

    private String registerCreditCard(CreditCardEntity creditCard, String stripeCustomerId) {
        Map<String, Object> retrieveParams = new HashMap<>();

        List<String> expandList = new ArrayList<>();
        expandList.add("sources");
        retrieveParams.put("expand", expandList);
        Customer customer = null;
        try {
            customer = Customer.retrieve(stripeCustomerId, retrieveParams, null);
        } catch (StripeException e) {
            throw new StripeUserException();
        }

        Map<String, Object> params = new HashMap<>();
        Token token = generateCreditCardToken(creditCard);
        params.put("source", token.getId());

        Card card = null;
        try {
            card = (Card) customer.getSources().create(params);
        } catch (StripeException e) {
            throw new StripeCreditCardException();
        }
        return card.getId();
    }

    private Token generateCreditCardToken(CreditCardEntity card) {
        Map<String, Object> cardParams = new HashMap<>();

        LocalDate expirationDate = card.getExpirationDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        Map<String, Object> creditCard = new HashMap<>();
        creditCard.put("name", card.getHolderFullName());
        creditCard.put("number", card.getNumber());
        creditCard.put("exp_month", expirationDate.getMonthValue());
        creditCard.put("exp_year", expirationDate.getYear());
        creditCard.put("cvc", card.getVerificationValue());

        cardParams.put("card", creditCard);

        try {
            return Token.create(cardParams);
        } catch (StripeException e) {
            throw new StripeCreditCardException();
        }
    }
}
