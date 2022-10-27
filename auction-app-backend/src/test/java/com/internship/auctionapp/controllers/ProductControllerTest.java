package com.internship.auctionapp.controllers;

import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.services.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDate;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    private Product product;

    @BeforeEach
    void setUp() {
        product = Product.builder()
                .id(UUID.fromString("3fa85f64-5717-4562-b3fc-2c963f66afa6"))
                .name("Shirt")
                .description("Black shirt")
                .imageURL("/shirt.jpg")
                .creationDate(LocalDate.now())
                .expirationDate(LocalDate.now())
                .status("available")
                .size("L")
                .build();
    }

    @Test
    void addProduct() throws Exception {
        Product inputProduct = Product.builder()
                .name("Shirt").description("Black shirt").imageURL("/shirt.jpg").creationDate(LocalDate.now()).expirationDate(LocalDate.now())
                .status("available").size("L").build();
        Mockito.when(productService.addProduct(inputProduct)).thenReturn(product);

        mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "name":"Shirt",
                            "description":"Black shirt",
                            "imageURL": "/shirt.jpg",
                            "creationDate":"2022-10-27",
                            "expirationDate":"2022-10-27",
                            "status": "available",
                            "size": "L"
                        }
                        """))
                .andExpect(status().isOk());
    }

    @Test
    void getSingleProduct() throws Exception {
        Mockito.when(productService.getSingleProduct(UUID.fromString("3fa85f64-5717-4562-b3fc-2c963f66afa6"))).thenReturn(product);
        mockMvc.perform(get("/api/v1/products/3fa85f64-5717-4562-b3fc-2c963f66afa6")
                        .contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.description").value(product.getDescription()));
    }
}