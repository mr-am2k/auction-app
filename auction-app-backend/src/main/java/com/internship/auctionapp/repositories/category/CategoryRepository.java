package com.internship.auctionapp.repositories.category;

import com.internship.auctionapp.models.Category;
import com.internship.auctionapp.requests.CreateCategoryRequest;

import java.util.List;

public interface CategoryRepository {
    Category addCategory(CreateCategoryRequest createCategoryRequest);

    List<Category> getAllCategories();
}
