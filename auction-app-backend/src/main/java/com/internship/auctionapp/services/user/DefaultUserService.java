package com.internship.auctionapp.services.user;

import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.models.JwtResponse;
import com.internship.auctionapp.models.MessageResponse;
import com.internship.auctionapp.repositories.user.UserJpaRepository;
import com.internship.auctionapp.repositories.user.UserRepository;
import com.internship.auctionapp.requests.UserLoginRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;
import com.internship.auctionapp.util.UserRole;
import com.internship.auctionapp.util.security.jwt.JwtUtils;
import com.internship.auctionapp.util.security.services.DefaultUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DefaultUserService implements UserService {

    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final PasswordEncoder encoder;

    private final JwtUtils jwtUtils;

    public DefaultUserService(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            PasswordEncoder encoder,
            JwtUtils jwtUtils
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }


    @Override
    public JwtResponse login(UserLoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtils.generateJwtToken(authentication);

        DefaultUserDetails userDetails = (DefaultUserDetails) authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return new JwtResponse(jwt, userDetails.getId(), userDetails.getEmail(), roles);
    }

    @Override
    public ResponseEntity<?> register(UserRegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already taken!"));
        }

        registerRequest.setPassword(encoder.encode(registerRequest.getPassword()));

        userRepository.addUser(registerRequest);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
