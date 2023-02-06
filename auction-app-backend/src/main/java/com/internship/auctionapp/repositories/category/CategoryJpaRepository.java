package com.internship.auctionapp.repositories.category;

import com.internship.auctionapp.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface CategoryJpaRepository extends JpaRepository<CategoryEntity, UUID> {
    boolean existsById(UUID id);

    Integer countAllByParentCategoryId(UUID parentCategoryId);

    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM products p\n" +
            "WHERE ?1 = p.subcategory_id AND p.expiration_date_time > NOW() \n" +
            "AND p.creation_date_time <= NOW()")
    Integer numberOfProductsPerSubcategory(UUID subcategoryId);
}
