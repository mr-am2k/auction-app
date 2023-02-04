package com.internship.auctionapp.controllers;

import com.internship.auctionapp.models.Category;
import com.internship.auctionapp.requests.CreateCategoryRequest;
import com.internship.auctionapp.services.category.CategoryService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/categories")
@CrossOrigin(origins = "*", maxAge = 3600)
@Tag(name = "Category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    @SecurityRequirement(name = "Bearer Authentication")
    public Category addCategory(@RequestBody CreateCategoryRequest createCategoryRequest) {
        return categoryService.addCategory(createCategoryRequest);
    }

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "Bearer Authentication")
    public void deleteCategory(@PathVariable("id") UUID id){
        categoryService.deleteCategory(id);
    }
}
