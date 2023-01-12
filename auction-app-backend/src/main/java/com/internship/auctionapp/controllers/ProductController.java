package com.internship.auctionapp.controllers;

import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.requests.CreateProductDataRequest;
import com.internship.auctionapp.requests.CreateProductRequest;
import com.internship.auctionapp.services.product.ProductService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/products")
@CrossOrigin
@Tag(name = "Products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    @SecurityRequirement(name = "Bearer Authentication")
    public Product addProduct(@Valid @RequestBody CreateProductDataRequest createProductDataRequest) {
        return productService.addProduct(createProductDataRequest);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getSingleProduct(@PathVariable("id") UUID id) {
        return productService.getSingleProduct(id);
    }

    @PutMapping("/{id}")
    @SecurityRequirement(name = "Bearer Authentication")
    public Product updateProduct(@PathVariable("id") UUID id, @RequestBody ProductEntity product) {
        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "Bearer Authentication")
    public void deleteProduct(@PathVariable("id") UUID id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/random")
    public Page<Product> getRandomProduct() {
        return productService.getRandomProduct();
    }

    @GetMapping("/search")
    public Page<Product> getProductsByCriteria(@RequestParam(required = false) String criteria) {
        return productService.getProductsByCriteria(criteria);
    }

    @GetMapping("/user/{userId}")
    @SecurityRequirement(name = "Bearer Authentication")
    public List<Product> getUserProducts(@PathVariable("userId") UUID userId){
        return productService.getUserProducts(userId);
    }

    @GetMapping("/related-products")
    public Page<Product> getRelatedProducts(@RequestParam UUID categoryId, @RequestParam UUID productId){
        return productService.getRelatedProducts(categoryId, productId);
    }
}
