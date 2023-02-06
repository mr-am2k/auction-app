package com.internship.auctionapp.repositories.category;

import com.internship.auctionapp.entities.CategoryEntity;
import com.internship.auctionapp.models.Category;
import com.internship.auctionapp.repositories.creditCard.CreditCardJpaRepository;
import com.internship.auctionapp.requests.CreateCategoryRequest;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class DefaultCategoryRepository implements CategoryRepository{
    private final CategoryJpaRepository categoryJpaRepository;

    public DefaultCategoryRepository(CategoryJpaRepository categoryJpaRepository) {
        this.categoryJpaRepository = categoryJpaRepository;
    }

    @Override
    public Category addCategory(CreateCategoryRequest createCategoryRequest) {
        final CategoryEntity category = new CategoryEntity();

        category.setName(createCategoryRequest.getName());

        if(createCategoryRequest.getParentCategoryId() != null){
            category.setParentCategoryId(createCategoryRequest.getParentCategoryId());
        }

        return categoryJpaRepository.save(category).toDomainModel();
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryJpaRepository.findAll().stream()
                .map(CategoryEntity::toDomainModel)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCategory(UUID categoryId) {
        categoryJpaRepository.deleteById(categoryId);
    }
}
