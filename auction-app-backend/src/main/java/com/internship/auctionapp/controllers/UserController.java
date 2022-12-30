package com.internship.auctionapp.controllers;

import com.internship.auctionapp.models.User;
import com.internship.auctionapp.requests.UpdateCardRequest;
import com.internship.auctionapp.requests.UpdateUserDataRequest;
import com.internship.auctionapp.requests.UpdateUserRequest;
import com.internship.auctionapp.services.bid.DefaultBidService;
import com.internship.auctionapp.services.user.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "*", maxAge = 3600)
@Tag(name = "User")
public class UserController {
    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultBidService.class);

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public User getSingleUser(HttpServletRequest request) {
        return userService.getSingleUser(request);
    }

    @PutMapping("/{id}")
    @SecurityRequirement(name = "Bearer Authentication")
    public User updateUser(
            @PathVariable("id") UUID id,
            @RequestBody UpdateUserDataRequest updateUserDataRequest
    ) {
        LOGGER.info(updateUserDataRequest.toString());
        return userService.updateUser(id, updateUserDataRequest.getUpdateUserRequest(), updateUserDataRequest.getUpdateCardRequest());
    }

    @GetMapping("/deactivate")
    @SecurityRequirement(name = "Bearer Authentication")
    public void deactivate(HttpServletRequest request) {
        userService.deactivate(request);
    }
}
