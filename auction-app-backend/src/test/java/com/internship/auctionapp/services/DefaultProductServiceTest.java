package com.internship.auctionapp.services;

import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.repositories.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class DefaultProductServiceTest {

    @Autowired
    private ProductService productService;

    @MockBean
    private ProductRepository productRepository;

    private static final UUID PRODUCT_ID = UUID.fromString("3fa85f64-5717-4562-b3fc-2c963f66afa6");

    @BeforeEach
    void setUp() {
        Product product = Product.builder()
                .id(PRODUCT_ID)
                .name("Shirt")
                .description("Black shirt")
                .imageURL("/shirt.jpg")
                .price(52.20)
                .creationDate(LocalDate.now())
                .expirationDate(LocalDate.now())
                .build();
        Mockito.when(productRepository.findById(UUID.fromString("3fa85f64-5717-4562-b3fc-2c963f66afa6"))).thenReturn(Optional.of(product));
    }

    @Test
    public void whenValidId_thenProductShouldBeFound() {
        String name = "Shirt";
        String imageURL = "/shirt.jpg";
        String size = "L";

        Product wantedProduct = productService.getSingleProduct(PRODUCT_ID);

        assertEquals(PRODUCT_ID, wantedProduct.getId());
        assertEquals(name, wantedProduct.getName());
        assertEquals(imageURL, wantedProduct.getImageURL());
    }
}