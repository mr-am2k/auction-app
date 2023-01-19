package com.internship.auctionapp.requests;

import com.internship.auctionapp.util.ProductSortCriteria;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class ProductFilterRequest {
    private Integer pageNumber;
    private String name;
    private UUID categoryId;
    private List<UUID> subcategoryIds;
    private Double minPrice;
    private Double maxPrice;
    private ProductSortCriteria productSortCriteria;
}

