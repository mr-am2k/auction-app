package com.internship.auctionapp.util.security.services;

import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.middleware.exception.AccountDeactivatedException;
import com.internship.auctionapp.middleware.exception.EmailNotValidException;
import com.internship.auctionapp.middleware.exception.PasswordNotValidException;
import com.internship.auctionapp.middleware.exception.PasswordRequiredException;
import com.internship.auctionapp.middleware.exception.UserAlreadyExistsException;
import com.internship.auctionapp.middleware.exception.UserSocialAccountException;
import com.internship.auctionapp.middleware.exception.UsernameNotFoundException;
import com.internship.auctionapp.models.AuthResponse;
import com.internship.auctionapp.models.LoginResponse;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.repositories.user.UserJpaRepository;
import com.internship.auctionapp.repositories.user.UserRepository;
import com.internship.auctionapp.requests.UserLoginRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;
import com.internship.auctionapp.requests.UserSocialLoginRequest;
import com.internship.auctionapp.services.bid.DefaultBidService;
import com.internship.auctionapp.services.blacklistedToken.AuthTokenService;
import com.internship.auctionapp.util.AuthenticationProvider;
import com.internship.auctionapp.util.RegexUtils;
import com.internship.auctionapp.util.security.jwt.JwtUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DefaultAuthService implements UserDetailsService, AuthService {
    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder encoder;

    private final JwtUtils jwtUtils;

    private final AuthTokenService authTokenService;
    private final UserJpaRepository userJpaRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultBidService.class);


    public DefaultAuthService(
            UserRepository userRepository,
            @Lazy AuthenticationManager authenticationManager,
            @Lazy PasswordEncoder encoder,
            JwtUtils jwtUtils,
            AuthTokenService authTokenService,
            UserJpaRepository userJpaRepository) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.authTokenService = authTokenService;
        this.userJpaRepository = userJpaRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws org.springframework.security.core.userdetails.UsernameNotFoundException {
        final UserEntity user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException(username);
        }

        if (!user.isActive()) {
            throw new AccountDeactivatedException();
        }

        return DefaultUserDetails.build(user);
    }

    @Override
    public LoginResponse login(UserLoginRequest loginRequest) {
        final UserEntity user = userJpaRepository.findByUsername(loginRequest.getUsername());

        if (user.getAuthenticationProvider() != AuthenticationProvider.LOCAL) {
            throw new UsernameNotFoundException(user.getUsername());
        }

        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        final DefaultUserDetails userPrincipal = (DefaultUserDetails) authentication.getPrincipal();


        final String accessToken = jwtUtils.generateJwtAccessToken(userPrincipal.getUsername());

        final String refreshToken = jwtUtils.generateJwtRefreshToken(loginRequest.getUsername());

        final DefaultUserDetails userDetails = (DefaultUserDetails) authentication.getPrincipal();

        final List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        authTokenService.addToken(accessToken, false);

        return new LoginResponse(accessToken, refreshToken, userDetails.getId(), userDetails.getEmail(), userDetails.getFullName(), roles);
    }

    @Override
    public User register(UserRegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new UserAlreadyExistsException(registerRequest.getEmail());
        }

        if (!RegexUtils.match(RegexUtils.VALID_EMAIL_ADDRESS_REGEX, registerRequest.getEmail())) {
            throw new EmailNotValidException();
        }

        if (registerRequest.getPassword() == null && registerRequest.getAuthenticationProvider() == AuthenticationProvider.LOCAL) {
            throw new PasswordRequiredException();
        }

        if (registerRequest.getAuthenticationProvider() == AuthenticationProvider.LOCAL && !RegexUtils.match(RegexUtils.VALID_PASSWORD_REGEX, registerRequest.getPassword())) {
            throw new PasswordNotValidException();
        }

        if (registerRequest.getAuthenticationProvider() == AuthenticationProvider.LOCAL) {
            registerRequest.setPassword(encoder.encode(registerRequest.getPassword()));
        }

        return userRepository.registerUser(registerRequest).toDomainModel();
    }

    @Override
    public void logout(String token) {
        jwtUtils.blacklistToken(token);
    }

    @Override
    public AuthResponse refreshToken(String username) {
        return new AuthResponse(jwtUtils.generateJwtAccessToken(username));
    }

    @Override
    public LoginResponse socialLogin(UserSocialLoginRequest socialLoginRequest) {
        final UserEntity user = userJpaRepository.findByUsername(socialLoginRequest.getEmail());

        if (user.getAuthenticationProvider() == AuthenticationProvider.LOCAL) {
            throw new UserSocialAccountException();
        }

        final String accessToken = jwtUtils.generateJwtAccessToken(user.getUsername());

        final String refreshToken = jwtUtils.generateJwtRefreshToken(user.getUsername());

        final List<String> roles = new ArrayList<>();

        roles.add(user.getRole().getValue());

        authTokenService.addToken(accessToken, false);

        return new LoginResponse(accessToken, refreshToken, user.getId(), user.getEmail(), user.getFullName(), roles);
    }
}
