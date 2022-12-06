package com.internship.auctionapp.util.security.services;

import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.middleware.exception.UserAlreadyExistsException;
import com.internship.auctionapp.middleware.exception.UserNotFoundException;
import com.internship.auctionapp.models.JwtResponse;
import com.internship.auctionapp.repositories.user.UserRepository;
import com.internship.auctionapp.requests.UserLoginRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;
import com.internship.auctionapp.util.security.jwt.JwtUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DefaultUserDetailsService implements UserDetailsService, UserDetailsServiceCustom {
    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder encoder;

    private final JwtUtils jwtUtils;

    public DefaultUserDetailsService(
            UserRepository userRepository,
            @Lazy AuthenticationManager authenticationManager,
            @Lazy PasswordEncoder encoder,
            JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        final UserEntity user = userRepository.findByEmail(email);

        if(user == null){
            throw new UserNotFoundException(email);
        }

        return DefaultUserDetails.build(user);
    }

    @Override
    public JwtResponse login(UserLoginRequest loginRequest) {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        final String jwt = jwtUtils.generateJwtToken(authentication);

        final DefaultUserDetails userDetails = (DefaultUserDetails) authentication.getPrincipal();

        final List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return new JwtResponse(jwt, userDetails.getId(), userDetails.getEmail(), roles);
    }

    @Override
    public String register(UserRegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new UserAlreadyExistsException(registerRequest.getEmail());
        }

        registerRequest.setPassword(encoder.encode(registerRequest.getPassword()));

        userRepository.addUser(registerRequest);

        return "User registered successfully!";
    }
}
