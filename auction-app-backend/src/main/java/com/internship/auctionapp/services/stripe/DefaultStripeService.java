package com.internship.auctionapp.services.stripe;

import com.internship.auctionapp.entities.CreditCardEntity;
import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.models.CreditCard;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.requests.CreatePaymentRequest;
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

@Service
public class DefaultStripeService implements StripeService {
    @Value("${app.stripe_secret_key}")
    private String STRIPE_SECRET_KEY;

    @PostConstruct
    public void init() {
        Stripe.apiKey = STRIPE_SECRET_KEY;
    }

    @Override
    public String createCustomer(UserEntity user) throws StripeException {
        Map<String, Object> customerParams = new HashMap<>();

        final String fullName = user.getFirstName() + " " + user.getLastName();

        customerParams.put("name", fullName);
        customerParams.put("email", user.getEmail());
        customerParams.put("description", "Customer for: " + fullName);

        Customer customer = Customer.create(customerParams);

        return customer.getId();
    }

    @Override
    public void completePayment(Integer amount, String customerId, String creditCardId, CreatePaymentRequest createPaymentRequest) throws StripeException {
        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", amount);
        chargeParams.put("currency", "usd");
        chargeParams.put("description", "Charge for user: " + customerId);
        chargeParams.put("customer", customerId);
        chargeParams.put("source", creditCardId);

        Charge charge = Charge.create(chargeParams);
    }

    @Override
    public String createCard(CreditCardEntity creditCard, String stripeCustomerId) throws StripeException {
        Map<String, Object> retrieveParams = new HashMap<>();
        List<String> expandList = new ArrayList<>();
        expandList.add("sources");
        retrieveParams.put("expand", expandList);
        Customer customer = Customer.retrieve(stripeCustomerId, retrieveParams, null);

        Map<String, Object> params = new HashMap<>();
        Token token = generateCreditCardToken(creditCard);
        params.put("source", token.getId());

        Card card = (Card) customer.getSources().create(params);
        return card.getId();
    }

    private Token generateCreditCardToken(CreditCardEntity card) throws StripeException {
        Map<String, Object> cardParams = new HashMap<>();

        LocalDate expirationDate = card.getExpirationDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        Map<String, Object> creditCard = new HashMap<>();
        creditCard.put("name", card.getHolderFullName());
        creditCard.put("number", card.getNumber());
        creditCard.put("exp_month", expirationDate.getMonthValue());
        creditCard.put("exp_year", expirationDate.getYear());
        creditCard.put("cvc", card.getVerificationValue());

        cardParams.put("card", creditCard);

        return Token.create(cardParams);
    }
}


