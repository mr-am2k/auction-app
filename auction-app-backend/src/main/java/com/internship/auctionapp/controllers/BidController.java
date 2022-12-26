package com.internship.auctionapp.controllers;

import com.internship.auctionapp.requests.CreateBidRequest;
import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.services.bid.BidService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/bids")
@CrossOrigin
@Tag(name = "Bids")
@SecurityRequirement(name = "Bearer Authentication")
public class BidController {
    private final BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @PostMapping()
    public Bid addBid(@RequestBody CreateBidRequest createBidRequest) {
        return bidService.addBid(createBidRequest);
    }

    @GetMapping()
    public List<Bid> getAllBids() {
        return bidService.getAllBids();
    }

    @GetMapping("/product/{productId}")
    public Double getHighestBid(@PathVariable("productId") UUID productId) {
        return bidService.getHighestBidPrice(productId);
    }

    @DeleteMapping("/{id}")
    public void deleteBid(@PathVariable("id") UUID id) {
        bidService.deleteBid(id);
    }
}
