package com.internship.auctionapp.requests;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class CreateCategoryRequest {
    private String name;

    private UUID parentCategoryId;
}
