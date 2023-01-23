package com.internship.auctionapp.util.filter.product;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.util.PageableRequest;
import lombok.Data;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;

@Data
public class ProductSpecification extends PageableRequest<String> {
    private ProductFilter productFilter;

    public ProductSpecification(ProductFilter productFilter) {
        this.productFilter = productFilter;
    }

    public Specification<ProductEntity> toFilterSpecification() {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (productFilter.getProductName() != null) {
                predicates.add(cb.like(cb.lower(root.get("name")), "%" + productFilter.getProductName().toLowerCase() + "%"));
            }

            if (productFilter.getCategoryId() != null) {
                predicates.add(root.get("category").get("id").in(productFilter.getCategoryId()));
            }

            if (productFilter.getSubcategoryIds() != null && !productFilter.getSubcategoryIds().isEmpty()) {
                predicates.add(root.get("subcategory").get("id").in(productFilter.getSubcategoryIds()));
            }

            if (productFilter.getMinPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("startPrice"), productFilter.getMinPrice()));
            }

            if (productFilter.getMaxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("startPrice"), productFilter.getMaxPrice()));
            }

            ZonedDateTime currentTime = ZonedDateTime.now();

            predicates.add(cb.greaterThanOrEqualTo(root.get("expirationDateTime"), currentTime));

            predicates.add(cb.lessThanOrEqualTo(root.get("creationDateTime"), currentTime));


            if (productFilter.getProductSort() == null) {
                query.orderBy(cb.asc(root.get("name")));
            } else {
                switch (productFilter.getProductSort()) {
                    case CREATED_DESC -> query.orderBy(cb.desc(root.get("creationDateTime")));
                    case EXPIRATION_ASC -> query.orderBy(cb.asc(root.get("expirationDateTime")));
                    case PRICE_ASC -> query.orderBy(cb.asc(root.get("startPrice")));
                    case PRICE_DESC -> query.orderBy(cb.desc(root.get("startPrice")));
                    default -> query.orderBy(cb.asc(root.get("name")));
                }
            }

            return cb.and(predicates.toArray(new Predicate[predicates.size()]));
        };
    }
}
