package com.internship.auctionapp.controllers;

import com.internship.auctionapp.models.Payment;
import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.requests.CreatePaymentRequest;
import com.internship.auctionapp.requests.CreateProductDataRequest;
import com.internship.auctionapp.requests.SearchProductRequest;
import com.internship.auctionapp.services.product.ProductService;

import com.internship.auctionapp.util.RequestUtils;
import com.internship.auctionapp.util.security.jwt.JwtUtils;
import com.internship.auctionapp.util.sse.EventsEmitterService;
import com.stripe.exception.StripeException;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/products")
@CrossOrigin
@Tag(name = "Products")
public class ProductController {
    private final ProductService productService;

    private final JwtUtils JwtUtils;

    private static Long connectionExpiration;

    private final EventsEmitterService eventsEmitterService;

    public ProductController(ProductService productService, JwtUtils jwtUtils, EventsEmitterService eventsEmitterService) {
        this.productService = productService;
        this.JwtUtils = jwtUtils;
        this.eventsEmitterService = eventsEmitterService;
    }

    @Value("${app.jwt_expiration_ms}")
    public void setJwtExpiration(Long connectionExpiration) {
        ProductController.connectionExpiration = connectionExpiration;
    }

    @GetMapping("/subscribe")
    public SseEmitter subscribe() {

        SseEmitter sseEmitter = new SseEmitter(connectionExpiration);
        eventsEmitterService.addEmitter(sseEmitter);

        return sseEmitter;
    }

    @PostMapping
    @SecurityRequirement(name = "Bearer Authentication")
    public Product addProduct(@Valid @RequestBody CreateProductDataRequest createProductDataRequest) {
        return productService.addProduct(createProductDataRequest);
    }

    @GetMapping
    public Page<Product> getProducts(@ModelAttribute SearchProductRequest searchProductRequest) {
        return productService.getProducts(searchProductRequest);
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
    public List<Product> getUserProducts(@PathVariable("userId") UUID userId) {
        return productService.getUserProducts(userId);
    }

    @GetMapping("/related")
    public Page<Product> getRelatedProducts(@RequestParam UUID categoryId, @RequestParam UUID productId) {
        return productService.getRelatedProducts(categoryId, productId);
    }

    @PostMapping("/pay")
    @SecurityRequirement(name = "Bearer Authentication")
    public Payment payForProduct(@RequestBody CreatePaymentRequest createPaymentRequest, HttpServletRequest request) throws StripeException {
        final String token = RequestUtils.getToken(request, RequestUtils.BEARER);
        final String username = JwtUtils.getEmailFromJwtToken(token, true);

        return productService.purchase(username, createPaymentRequest);
    }
}
