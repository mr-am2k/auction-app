package com.internship.auctionapp.util.filter.product;

import lombok.Data;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

@Data
public class ProductFilter {
    private String productName;
    private UUID categoryId;
    private List<UUID> subcategoryIds;
    private Double minPrice;
    private Double maxPrice;
    private ProductSort productSort;

    private Pageable page;

    public ProductFilter(FilterAndSortBuilder builder) {
        this.productName = builder.productName;
        this.categoryId = builder.categoryId;
        this.subcategoryIds = builder.subcategoryIds;
        this.minPrice = builder.minPrice;
        this.maxPrice = builder.maxPrice;
        this.productSort = builder.productSort;
        this.page = builder.page;
    }
}
