package com.internship.auctionapp.requests;

import com.internship.auctionapp.util.PageableRequest;
import com.internship.auctionapp.util.filter.product.ProductSort;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class SearchProductRequest extends PageableRequest<String> {
    private Integer pageNumber;
    private String name;
    private UUID categoryId;
    private List<UUID> subcategoryIds;
    private Double minPrice;
    private Double maxPrice;
    private ProductSort productSort;

    private final static Integer DEFAULT_PAGE_SIZE = 9;

    public SearchProductRequest(Integer pageNumber) {
        super(pageNumber, DEFAULT_PAGE_SIZE, null);
    }
}

