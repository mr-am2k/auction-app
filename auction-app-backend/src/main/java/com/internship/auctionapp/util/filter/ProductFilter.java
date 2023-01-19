package com.internship.auctionapp.util.filter;

import com.internship.auctionapp.util.ProductSortCriteria;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class ProductFilter {
    private String productName;
    private UUID categoryId;
    private List<UUID> subcategoryIds;
    private Double minPrice;
    private Double maxPrice;
    private ProductSortCriteria productSortCriteria;

    public ProductFilter(FilterAndSortBuilder builder) {
        this.productName = builder.productName;
        this.categoryId = builder.categoryId;
        this.subcategoryIds = builder.subcategoryIds;
        this.minPrice = builder.minPrice;
        this.maxPrice = builder.maxPrice;
        this.productSortCriteria = builder.productSortCriteria;
    }
}
