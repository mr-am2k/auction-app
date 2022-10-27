package com.internship.auctionapp.controllers;

import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.services.ProductService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/")
@Tag(name="Products")
public class ProductController {
    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    //Add new product
    @PostMapping("/products")
    public Product addProduct(@Valid @RequestBody Product product){
        return productService.addProduct(product);
    }

    //Get all products
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
    //Get product by ID
    @GetMapping("/products/{id}")
    public Product getSingleProduct(@PathVariable("id") UUID id){
        return productService.getSingleProduct(id);
    }
    //Updating product
    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable("id") UUID id,@RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    //Deleting product
    @DeleteMapping("/product/{id}")
    public String deleteProduct(@PathVariable("id") UUID id){
        productService.deleteProduct(id);
        return "Product deleted successfully";
    }





}
