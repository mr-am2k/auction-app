package com.internship.auctionapp.controllers;

import com.internship.auctionapp.DAO.BidDAO;
import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.services.BidService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequestMapping("api/v1/bid/")
@CrossOrigin
@Tag(name = "Bids")
public class BidController {

    private final BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @PostMapping()
    public Bid addBid(@RequestBody BidDAO bid){
        return bidService.addBid(bid);
    }

    @GetMapping()
    public List<Bid> getAllBids() {
        return bidService.getAllBids();
    }

    @DeleteMapping("/{id}")
    public void deleteBid(@PathVariable("id") UUID id){
         bidService.deleteBid(id);
    }
}
