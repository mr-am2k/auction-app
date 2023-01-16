package com.internship.auctionapp.controllers;

import com.internship.auctionapp.requests.CreateBidRequest;
import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.services.bid.BidService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

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
@RequestMapping("api/v1/")
@CrossOrigin
@Tag(name = "Bids")
public class BidController {
    private final BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @PostMapping("/product/{productId}/bids")
    @SecurityRequirement(name = "Bearer Authentication")
    public Bid addBid(@RequestBody CreateBidRequest createBidRequest) {
        return bidService.addBid(createBidRequest);
    }

    @GetMapping("/product/{productId}/bids/highest")
    public Double getHighestBidPrice(@PathVariable("productId") UUID productId) {
        return bidService.getHighestBidPrice(productId);
    }

    @GetMapping("/user/{userId}/bids")
    @SecurityRequirement(name = "Bearer Authentication")
    public List<Bid> getUserBids(@PathVariable("userId") UUID userId){
        return bidService.getUserBids(userId);
    }

    @GetMapping("/product/{productId}/bids")
    @SecurityRequirement(name = "Bearer Authentication")
    public Page<Bid> getProductBids(@PathVariable("productId") UUID productId, @RequestParam Integer pageNumber){
        return bidService.getProductBids(productId, pageNumber);
    }
}
