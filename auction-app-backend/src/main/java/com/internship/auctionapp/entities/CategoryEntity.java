package com.internship.auctionapp.entities;

import com.internship.auctionapp.models.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "categories")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "parent_category_id")
    private UUID parentCategoryId;

    @Formula("(SELECT COUNT(*) FROM products p WHERE p.subcategory_id = id AND p.expiration_date_time > NOW() AND p.creation_date_time <= NOW())")
    private Integer numberOfProducts;

    public Category toDomainModel(){
        Category category = new Category();

        category.setId(this.id);
        category.setName(this.name);
        category.setParentCategoryId(this.parentCategoryId);
        category.setNumberOfProducts(this.numberOfProducts);

        return category;
    }
}
