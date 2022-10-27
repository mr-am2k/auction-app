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

    @BeforeEach
    void setUp() {
        Product product = Product.builder()
                .id(UUID.fromString("3fa85f64-5717-4562-b3fc-2c963f66afa6"))
                .name("Shirt")
                .description("Black shirt")
                .imageURL("/shirt.jpg")
                .creationDate(LocalDate.now())
                .expirationDate(LocalDate.now())
                .status("available")
                .size("L")
                .build();
        Mockito.when(productRepository.findById(UUID.fromString("3fa85f64-5717-4562-b3fc-2c963f66afa6"))).thenReturn(Optional.ofNullable(product));
    }

    @Test
    public void whenValidId_thenProductShouldBeFound(){
        UUID id = UUID.fromString("3fa85f64-5717-4562-b3fc-2c963f66afa6");
        String name = "Shirt";
        String imageURL = "/shirt.jpg";
        String size = "L";
        Product wantedProduct = productService.getSingleProduct(id);
        assertEquals(id, wantedProduct.getId());
        assertEquals(name, wantedProduct.getName());
        assertEquals(imageURL, wantedProduct.getImageURL());
        assertEquals(size, wantedProduct.getSize());
    }
}