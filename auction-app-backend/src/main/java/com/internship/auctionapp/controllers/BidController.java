package com.internship.auctionapp.controllers;

import com.internship.auctionapp.DAO.CreateBidRequest;
import com.internship.auctionapp.DTO.BidDTO;
import com.internship.auctionapp.services.BidService;
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
@RequestMapping("api/v1/bid/")
@CrossOrigin
@Tag(name = "Bids")
public class BidController {

    private final BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @PostMapping()
    public String addBid(@RequestBody CreateBidRequest createBidRequest){
        return bidService.addBid(createBidRequest);
    }

    @GetMapping()
    public List<BidDTO> getAllBids() {
        return bidService.getAllBids();
    }

    @GetMapping("/{productId}")
    public double getHighestBid(@PathVariable("productId") UUID productId) {
        return bidService.getHighestBid(productId);
    }

    @DeleteMapping("/{id}")
    public void deleteBid(@PathVariable("id") UUID id){
         bidService.deleteBid(id);
    }
}
