package com.internship.auctionapp.util.filter;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.util.ProductSortCriteria;
import lombok.Data;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;

@Data
public class FilterAndSortProduct {
    private String productName;
    private UUID categoryId;
    private List<UUID> subcategoryIds;
    private Double minPrice;
    private Double maxPrice;
    private ProductSortCriteria productSortCriteria;

    public FilterAndSortProduct(FilterAndSortBuilder builder) {
        this.productName = builder.productName;
        this.categoryId = builder.categoryId;
        this.subcategoryIds = builder.subcategoryIds;
        this.minPrice = builder.minPrice;
        this.maxPrice = builder.maxPrice;
        this.productSortCriteria = builder.productSortCriteria;
    }

    public Specification<ProductEntity> toFilterSpecification() {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (productName != null) {
                predicates.add(cb.like(cb.lower(root.get("name")), "%" + productName.toLowerCase() + "%"));
            }

            if (categoryId != null) {
                predicates.add(root.get("category").get("id").in(categoryId));
            }

            if (subcategoryIds != null && !subcategoryIds.isEmpty()) {
                predicates.add(root.get("subcategory").get("id").in(subcategoryIds));
            }

            if (minPrice != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("startPrice"), minPrice));
            }

            if (maxPrice != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("startPrice"), maxPrice));
            }

            ZonedDateTime currentTime = ZonedDateTime.now();

            predicates.add(cb.greaterThanOrEqualTo(root.get("expirationDateTime"), currentTime));

            predicates.add(cb.lessThanOrEqualTo(root.get("creationDateTime"), currentTime));


            if (productSortCriteria == null) {
                query.orderBy(cb.asc(root.get("name")));
            } else {
                switch (productSortCriteria) {
                    case CREATED_NEWEST -> query.orderBy(cb.desc(root.get("creationDateTime")));
                    case EXPIRATION_SOONEST -> query.orderBy(cb.asc(root.get("expirationDateTime")));
                    case PRICE_ASC -> query.orderBy(cb.asc(root.get("startPrice")));
                    case PRICE_DESC -> query.orderBy(cb.desc(root.get("startPrice")));
                } ;
            }

            return cb.and(predicates.toArray(new Predicate[predicates.size()]));
        };
    }
}
