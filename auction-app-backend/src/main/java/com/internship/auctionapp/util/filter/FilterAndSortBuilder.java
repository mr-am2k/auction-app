package com.internship.auctionapp.util.filter;

import com.internship.auctionapp.util.ProductSortCriteria;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class FilterAndSortBuilder {
    protected String productName;

    protected UUID categoryId;
    protected List<UUID> subcategoryIds;
    protected Double minPrice;
    protected Double maxPrice;
    protected ProductSortCriteria productSortCriteria;

    public FilterAndSortBuilder name(String name) {
        this.productName = name;
        return this;
    }

    public FilterAndSortBuilder categoryId(UUID categoryId) {
        this.categoryId = categoryId;
        return this;
    }

    public FilterAndSortBuilder subcategoryIds(List<UUID> subcategoryIds) {
        this.subcategoryIds = subcategoryIds;
        return this;
    }

    public FilterAndSortBuilder minPrice(Double minPrice) {
        this.minPrice = minPrice;
        return this;
    }

    public FilterAndSortBuilder maxPrice(Double maxPrice) {
        this.maxPrice = maxPrice;
        return this;
    }

    public FilterAndSortBuilder sortCriteria(ProductSortCriteria productSortCriteria) {
        this.productSortCriteria = productSortCriteria;
        return this;
    }

    public FilterAndSortProduct build() {
        return new FilterAndSortProduct(this);
    }
}
