package com.internship.auctionapp.controllers;

import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.services.ProductService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/products")
@Tag(name = "Products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping()
    public Product addProduct(@Valid @RequestBody Product product) {
        return productService.addProduct(product);
    }

    @GetMapping()
    public List<Product> getAllProducts() throws Exception {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getSingleProduct(@PathVariable("id") UUID id) {
        return productService.getSingleProduct(id);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable("id") UUID id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable("id") UUID id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/randomProduct")
    public Product getRandomProduct(){
        return productService.getRandomProduct();
    }

    @GetMapping("/searchProducts")
    public List<Product> getProductsByCriteria(@RequestParam(required = false) String oldOrNew){
        return productService.getProductsByCriteria(oldOrNew);
    }
}
