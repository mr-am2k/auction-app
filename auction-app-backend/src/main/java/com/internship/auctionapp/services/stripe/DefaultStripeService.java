package com.internship.auctionapp.services.stripe;

import com.internship.auctionapp.entities.UserEntity;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DefaultStripeService implements StripeService {
    @Value("${app.stripe_secret_key}")
    private String STRIPE_SECRET_KEY;

    @Override
    public String createCustomer(UserEntity user) throws StripeException {
        Stripe.apiKey = STRIPE_SECRET_KEY;
        Map<String, Object> customerParams = new HashMap<>();

        final String fullName = user.getFirstName() + " " + user.getLastName();

        customerParams.put("name", fullName);
        customerParams.put("email", user.getEmail());
        customerParams.put("description", "Customer for: " + fullName);

        Customer customer = Customer.create(customerParams);

        return customer.getId();
    }
}


