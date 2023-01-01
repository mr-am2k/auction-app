package com.internship.auctionapp.util.security.services;

import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.middleware.exception.DeactivatedAccountException;
import com.internship.auctionapp.middleware.exception.EmailNotValidException;
import com.internship.auctionapp.middleware.exception.PasswordNotValidException;
import com.internship.auctionapp.middleware.exception.UserAlreadyExistsException;
import com.internship.auctionapp.middleware.exception.UserNotFoundByUsernameException;
import com.internship.auctionapp.models.AuthResponse;
import com.internship.auctionapp.models.LoginResponse;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.repositories.user.UserRepository;
import com.internship.auctionapp.requests.UserLoginRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;
import com.internship.auctionapp.services.blacklistedToken.AuthTokenService;
import com.internship.auctionapp.util.RegexUtils;
import com.internship.auctionapp.util.security.jwt.JwtUtils;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DefaultAuthService implements UserDetailsService, AuthService {
    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder encoder;

    private final JwtUtils jwtUtils;

    private final AuthTokenService authTokenService;

    private final String AUTHORIZATION_HEADER = "Authorization";
    private final String BEARER = "Bearer";
    private final String REFRESH = "Refresh";

    public DefaultAuthService(
            UserRepository userRepository,
            @Lazy AuthenticationManager authenticationManager,
            @Lazy PasswordEncoder encoder,
            JwtUtils jwtUtils,
            AuthTokenService authTokenService) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.authTokenService = authTokenService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final UserEntity user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UserNotFoundByUsernameException(username);
        }

        if(!user.isActive()){
            throw new DeactivatedAccountException();
        }

        return DefaultUserDetails.build(user);
    }

    @Override
    public LoginResponse login(UserLoginRequest loginRequest) {
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

        if (!RegexUtils.match(RegexUtils.VALID_PASSWORD_REGEX, registerRequest.getPassword())) {
            throw new PasswordNotValidException();
        }

        registerRequest.setPassword(encoder.encode(registerRequest.getPassword()));

        return userRepository.registerUser(registerRequest).toDomainModel();
    }

    @Override
    public void logout(HttpServletRequest request) {
        final String requestTokenHeader = request.getHeader(AUTHORIZATION_HEADER);
        String token = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith(BEARER)) {
            token = requestTokenHeader.substring(BEARER.length());
        }

        jwtUtils.blacklistToken(token);
    }

    @Override
    public AuthResponse refreshToken(HttpServletRequest request) {
        final String requestTokenHeader = request.getHeader(AUTHORIZATION_HEADER);
        String token = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith(REFRESH)) {
            token = requestTokenHeader.substring(REFRESH.length());
        }

        jwtUtils.validateJwtToken(token);

        final String username = jwtUtils.getEmailFromJwtToken(token, false);

        return new AuthResponse(jwtUtils.generateJwtAccessToken(username));
    }
}
