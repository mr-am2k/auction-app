package com.internship.auctionapp.controllers;

import com.internship.auctionapp.requests.CreateBidRequest;
import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.services.bid.BidService;

import com.internship.auctionapp.services.bid.DefaultBidService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/bids")
@CrossOrigin
@Tag(name = "Bids")
public class BidController {
    private final BidService bidService;

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultBidService.class);


    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @PostMapping()
    @SecurityRequirement(name = "Bearer Authentication")
    public Bid addBid(@RequestBody CreateBidRequest createBidRequest) {
        return bidService.addBid(createBidRequest);
    }

    @GetMapping()
    public List<Bid> getAllBids() {
        return bidService.getAllBids();
    }

    @GetMapping("/product/{productId}")
    public Double getHighestBidPrice(@PathVariable("productId") UUID productId) {
        return bidService.getHighestBidPrice(productId);
    }

    @GetMapping("/user/{userId}")
    @SecurityRequirement(name = "Bearer Authentication")
    public List<Bid> getUserBids(@PathVariable("userId") UUID userId){
        return bidService.getUserBids(userId);
    }

    @GetMapping("/{productId}")
    @SecurityRequirement(name = "Bearer Authentication")
    public Page<Bid> getProductBids(@PathVariable("productId") UUID productId, @RequestParam(defaultValue = "0") Integer pageNumber){
        LOGGER.warn(pageNumber.toString());
        return bidService.getProductBids(productId, pageNumber);
    }
}
