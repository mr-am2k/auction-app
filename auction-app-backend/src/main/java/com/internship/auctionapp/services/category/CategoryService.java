package com.internship.auctionapp.services.category;

import com.internship.auctionapp.models.Category;
import com.internship.auctionapp.requests.CreateCategoryRequest;

import java.util.List;
import java.util.UUID;

public interface CategoryService {
    Category addCategory(CreateCategoryRequest createCategoryRequest);

    List<Category> getAllCategories();

    void deleteCategory(UUID categoryId);
}
