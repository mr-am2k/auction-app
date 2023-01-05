package com.internship.auctionapp.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateProductRequest {
    private String name;

    private String description;

    private List<String> imageURLs;

    private double startPrice;

    private UUID categoryId;

    private Date creationDateTime;

    private Date expirationDateTime;

    private UUID userId;
}
