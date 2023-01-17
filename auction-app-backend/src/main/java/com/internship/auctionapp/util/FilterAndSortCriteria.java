package com.internship.auctionapp.util;

import com.internship.auctionapp.entities.ProductEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Data
public class FilterAndSortCriteria {
    private String name;
    private UUID categoryId;
    private List<UUID> subcategoryIds;
    private Double minPrice;
    private Double maxPrice;
    private SortCriteria sortCriteria;

    private FilterAndSortCriteria(FilterAndSortCriteriaBuilder builder) {
        this.name = builder.name;
        this.categoryId = builder.categoryId;
        this.subcategoryIds = builder.subcategoryIds;
        this.minPrice = builder.minPrice;
        this.maxPrice = builder.maxPrice;
        this.sortCriteria = builder.sortCriteria;
    }

    public static class FilterAndSortCriteriaBuilder {
        private String name;
        private UUID categoryId;
        private List<UUID> subcategoryIds;
        private Double minPrice;
        private Double maxPrice;
        private SortCriteria sortCriteria;

        public FilterAndSortCriteriaBuilder name(String name) {
            this.name = name;
            return this;
        }

        public FilterAndSortCriteriaBuilder categoryId(UUID categoryId) {
            this.categoryId = categoryId;
            return this;
        }

        public FilterAndSortCriteriaBuilder subcategoryIds(List<UUID> subcategoryIds) {
            this.subcategoryIds = subcategoryIds;
            return this;
        }

        public FilterAndSortCriteriaBuilder minPrice(Double minPrice) {
            this.minPrice = minPrice;
            return this;
        }

        public FilterAndSortCriteriaBuilder maxPrice(Double maxPrice) {
            this.maxPrice = maxPrice;
            return this;
        }

        public FilterAndSortCriteriaBuilder sortCriteria(SortCriteria sortCriteria) {
            this.sortCriteria = sortCriteria;
            return this;
        }

        public FilterAndSortCriteria build() {
            return new FilterAndSortCriteria(this);
        }
    }

    public Specification<ProductEntity> toSpecification() {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (name != null) {
                predicates.add(cb.like(root.get("name"), "%" + name + "%"));
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
            return cb.and(predicates.toArray(new Predicate[predicates.size()]));
        };
    }

    public Sort toSort() {
        if (sortCriteria == null) {
            return Sort.by("name").ascending();
        }

        return switch (sortCriteria) {
            case CREATED_NEWEST -> Sort.by("creationDateTime").descending();
            case EXPIRATION_SOONEST -> Sort.by("expirationDateTime").ascending();
            case PRICE_ASC -> Sort.by("startPrice").ascending();
            case PRICE_DESC -> Sort.by("startPrice").descending();
            default -> Sort.by("name").ascending();
        };
    }
}
