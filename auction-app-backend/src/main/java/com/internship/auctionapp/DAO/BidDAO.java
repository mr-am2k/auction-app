package com.internship.auctionapp.DAO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BidDAO {

    private double bidPrice;

    private UUID productId;
}
