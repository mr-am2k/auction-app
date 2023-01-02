package com.internship.auctionapp.services.category;

import com.internship.auctionapp.entities.CategoryEntity;
import com.internship.auctionapp.middleware.exception.SubcategoryAlreadyExistsException;
import com.internship.auctionapp.models.Category;
import com.internship.auctionapp.repositories.category.CategoryJpaRepository;
import com.internship.auctionapp.repositories.category.CategoryRepository;
import com.internship.auctionapp.requests.CreateCategoryRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class DefaultCategoryService implements CategoryService {
    private final CategoryRepository categoryRepository;

    private final CategoryJpaRepository categoryJpaRepository;

    public DefaultCategoryService(CategoryRepository categoryRepository, CategoryJpaRepository categoryJpaRepository) {
        this.categoryRepository = categoryRepository;
        this.categoryJpaRepository = categoryJpaRepository;
    }

    @Override
    public Category addCategory(CreateCategoryRequest createCategoryRequest) {
        if (createCategoryRequest.getParentCategoryId() != null) {
            CategoryEntity category = categoryJpaRepository.findById(createCategoryRequest.getParentCategoryId()).orElse(null);
            if (category != null && category.getParentCategoryId() != null) {
                throw new SubcategoryAlreadyExistsException();
            }
        }

        return categoryRepository.addCategory(createCategoryRequest);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.getAllCategories();
    }
}
