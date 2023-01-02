package com.internship.auctionapp.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class Category {
    private UUID id;

    private String name;

    private UUID parentCategoryId;

    private Integer numberOfProducts;
}
