package com.internship.auctionapp.services.user;

import com.internship.auctionapp.models.Address;
import com.internship.auctionapp.middleware.exception.EmailNotValidException;
import com.internship.auctionapp.middleware.exception.InvalidBirthDateException;
import com.internship.auctionapp.middleware.exception.InvalidCVVException;
import com.internship.auctionapp.middleware.exception.InvalidCardExpirationDateException;
import com.internship.auctionapp.middleware.exception.InvalidCardNumberException;
import com.internship.auctionapp.models.AuthResponse;
import com.internship.auctionapp.models.LoginResponse;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.repositories.user.UserRepository;
import com.internship.auctionapp.requests.CheckIfUserExistsRequest;
import com.internship.auctionapp.requests.CreateCreditCardRequest;
import com.internship.auctionapp.requests.UpdateUserDataRequest;
import com.internship.auctionapp.requests.UpdateUserRequest;
import com.internship.auctionapp.requests.UserLoginRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;
import com.internship.auctionapp.requests.UserSocialLoginRequest;
import com.internship.auctionapp.services.bid.DefaultBidService;
import com.internship.auctionapp.util.DateUtils;
import com.internship.auctionapp.util.RegexUtils;
import com.internship.auctionapp.util.security.services.AuthService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DefaultUserService implements UserService {
    private final AuthService authService;

    private final UserRepository userRepository;

    private final Integer EXPECTED_CREDIT_CARD_NUMBER_LENGTH = 16;
    private final Integer EXPECTED_CVV_LENGTH = 3;

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultBidService.class);

    public DefaultUserService(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @Override
    public LoginResponse login(UserLoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @Override
    public User register(UserRegisterRequest registerRequest) {
        return authService.register(registerRequest);
    }

    @Override
    public void logout(String token) {
        authService.logout(token);
    }

    @Override
    public AuthResponse refreshToken(String username) {
        return authService.refreshToken(username);
    }

    @Override
    public User getUser(UUID userId) {
        return userRepository.getUser(userId);
    }

    @Override
    public User updateUser(UpdateUserDataRequest updateUserDataRequest, String username) {
        final UpdateUserRequest updateUserRequest = updateUserDataRequest.getUpdateUserRequest();
        final Address address = updateUserDataRequest.getUpdateUserRequest().getAddress();
        final CreateCreditCardRequest updateCreditCardRequest = updateUserDataRequest.getUpdateCreditCardRequest();

        if (updateUserRequest.getDateOfBirth() != null && DateUtils.isInFuture(updateUserRequest.getDateOfBirth())) {
            throw new InvalidBirthDateException();
        }

        if (!RegexUtils.match(RegexUtils.VALID_EMAIL_ADDRESS_REGEX, updateUserRequest.getEmail())) {
            throw new EmailNotValidException();
        }

        if (updateCreditCardRequest != null) {
            if (updateCreditCardRequest.getExpirationDate() != null && DateUtils.isInPast(updateCreditCardRequest.getExpirationDate())) {
                throw new InvalidCardExpirationDateException();
            }

            if (updateCreditCardRequest.getNumber() != null && updateCreditCardRequest.getNumber().length() != EXPECTED_CREDIT_CARD_NUMBER_LENGTH) {
                throw new InvalidCardNumberException();
            }

            if (updateCreditCardRequest.getVerificationValue() != null && updateCreditCardRequest.getVerificationValue().length() != EXPECTED_CVV_LENGTH) {
                throw new InvalidCVVException();
            }
        }

        return userRepository.updateUser(username, updateUserRequest, updateCreditCardRequest, address);
    }

    @Override
    public void deactivate(String username) {
        userRepository.deactivate(username);
    }

    @Override
    public boolean checkIfUserExists(CheckIfUserExistsRequest checkIfUserExistsRequest) {
        return userRepository.existsByEmail(checkIfUserExistsRequest.getEmail());
    }

    @Override
    public LoginResponse socialLogin(UserSocialLoginRequest userSocialLoginRequest) {
        return authService.socialLogin(userSocialLoginRequest);
    }
}
