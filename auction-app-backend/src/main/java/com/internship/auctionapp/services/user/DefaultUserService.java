package com.internship.auctionapp.services.user;

import com.internship.auctionapp.middleware.exception.EmailNotValidException;
import com.internship.auctionapp.middleware.exception.InvalidBirthDateException;
import com.internship.auctionapp.middleware.exception.InvalidCVVException;
import com.internship.auctionapp.middleware.exception.InvalidCardExpirationDateException;
import com.internship.auctionapp.middleware.exception.InvalidCardNumberException;
import com.internship.auctionapp.models.AuthResponse;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.repositories.user.UserRepository;
import com.internship.auctionapp.requests.UpdateCardRequest;
import com.internship.auctionapp.requests.UpdateUserRequest;
import com.internship.auctionapp.requests.UserLoginRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;
import com.internship.auctionapp.services.bid.DefaultBidService;
import com.internship.auctionapp.util.RegexUtils;
import com.internship.auctionapp.util.security.jwt.JwtUtils;
import com.internship.auctionapp.util.security.services.AuthService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.UUID;

@Service
public class DefaultUserService implements UserService {
    private final AuthService authService;

    private final UserRepository userRepository;

    private final JwtUtils jwtUtils;

    private final String AUTHORIZATION_HEADER = "Authorization";
    private final String BEARER = "Bearer ";

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultBidService.class);


    public DefaultUserService(AuthService authService, UserRepository userRepository, JwtUtils jwtUtils) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public AuthResponse login(UserLoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @Override
    public User register(UserRegisterRequest registerRequest) {
        return authService.register(registerRequest);
    }

    @Override
    public void logout(HttpServletRequest request) {
        authService.logout(request);
    }

    @Override
    public User getSingleUser(HttpServletRequest request) {
        final String requestTokenHeader = request.getHeader(AUTHORIZATION_HEADER);

        String token = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith(BEARER)) {
            token = requestTokenHeader.substring(BEARER.length());
        }

        String username = jwtUtils.getEmailFromJwtToken(token);

        return userRepository.getSingleUser(username);
    }

    @Override
    public User updateUser(UUID id, UpdateUserRequest updateUserRequest, UpdateCardRequest updateCardRequest) {
        if(updateUserRequest.getDateOfBirth() != null && updateUserRequest.getDateOfBirth().after(new Date())){
            throw new InvalidBirthDateException();
        }

        if (!RegexUtils.match(RegexUtils.VALID_EMAIL_ADDRESS_REGEX, updateUserRequest.getEmail())) {
            throw new EmailNotValidException();
        }

        if(updateCardRequest.getExpirationDate() != null && updateCardRequest.getExpirationDate().before(new Date())){
            throw new InvalidCardExpirationDateException();
        }

        if(updateCardRequest.getNumber() != null && updateCardRequest.getNumber().length() != 16){
            throw new InvalidCardNumberException();
        }

        if(updateCardRequest.getVerificationValue() != null && updateCardRequest.getVerificationValue().length() != 3){
            throw new InvalidCVVException();
        }

        return userRepository.updateUser(id, updateUserRequest, updateCardRequest);
    }

    @Override
    public void deactivate(HttpServletRequest request) {
        final String requestTokenHeader = request.getHeader(AUTHORIZATION_HEADER);

        String token = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith(BEARER)) {
            token = requestTokenHeader.substring(BEARER.length());
        }

        String username = jwtUtils.getEmailFromJwtToken(token);


        userRepository.deactivate(username);
    }
}
