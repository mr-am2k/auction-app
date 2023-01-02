package com.internship.auctionapp.services.category;

import com.internship.auctionapp.models.Category;
import com.internship.auctionapp.requests.CreateCategoryRequest;

import java.util.List;

public interface CategoryService {
    Category addCategory(CreateCategoryRequest createCategoryRequest);

    List<Category> getAllCategories();
}
