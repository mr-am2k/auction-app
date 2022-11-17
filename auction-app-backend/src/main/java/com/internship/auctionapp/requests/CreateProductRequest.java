package com.internship.auctionapp.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateProductRequest {
    private String name;

    private String description;

    private List<String> imageURL;

    private double price;

    private LocalDateTime expirationDateTime;
}
