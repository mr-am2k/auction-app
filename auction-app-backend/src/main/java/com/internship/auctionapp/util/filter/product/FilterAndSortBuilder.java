package com.internship.auctionapp.util.filter.product;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

@Data
@Builder
public class FilterAndSortBuilder {
    protected String productName;

    protected UUID categoryId;
    protected List<UUID> subcategoryIds;
    protected Double minPrice;
    protected Double maxPrice;
    protected ProductSort productSort;

    protected Pageable page;
}
