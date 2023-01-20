package com.internship.auctionapp.util.filter.product;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

@Data
@Builder
public class ProductFilter {
    private String productName;
    private UUID categoryId;
    private List<UUID> subcategoryIds;
    private Double minPrice;
    private Double maxPrice;
    private ProductSort productSort;

    private Pageable page;
}
