package com.internship.auctionapp.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BidDTO {

    private UUID id;

    private double bidPrice;

    private LocalDateTime bidCreationDateTime;

    private UUID productId;
}
