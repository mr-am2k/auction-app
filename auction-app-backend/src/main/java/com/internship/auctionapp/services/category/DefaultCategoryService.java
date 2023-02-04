package com.internship.auctionapp.services.category;

import com.internship.auctionapp.entities.CategoryEntity;
import com.internship.auctionapp.middleware.exception.CreditCardNotFoundException;
import com.internship.auctionapp.middleware.exception.SubcategoriesExistException;
import com.internship.auctionapp.middleware.exception.SubcategoryAlreadyExistsException;
import com.internship.auctionapp.middleware.exception.SubcategoryHasProductsException;
import com.internship.auctionapp.models.Category;
import com.internship.auctionapp.repositories.category.CategoryJpaRepository;
import com.internship.auctionapp.repositories.category.CategoryRepository;
import com.internship.auctionapp.requests.CreateCategoryRequest;
import com.internship.auctionapp.services.bid.DefaultBidService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
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
            final CategoryEntity category = categoryJpaRepository.findById(createCategoryRequest.getParentCategoryId()).
                    orElseThrow(() -> new CreditCardNotFoundException(createCategoryRequest.getParentCategoryId().toString()));

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

    @Override
    public void deleteCategory(UUID categoryId) {
        Integer numberOfSubcategories = categoryJpaRepository.countAllByParentCategoryId(categoryId);

        Integer numberOfProducts = categoryJpaRepository.numberOfProductsPerSubcategory(categoryId);

        if (numberOfSubcategories > 0) {
            throw new SubcategoriesExistException();
        }

        if (numberOfProducts > 0) {
            throw new SubcategoryHasProductsException();
        }

        categoryRepository.deleteCategory(categoryId);
    }
}
