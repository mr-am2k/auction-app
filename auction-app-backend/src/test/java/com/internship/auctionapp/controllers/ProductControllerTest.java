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
                .Name("Shirt")
                .Description("Black shirt")
                .ImageURL("/shirt.jpg")
                .CreationDate(LocalDate.now())
                .ExpirationDate(LocalDate.now())
                .Status("available")
                .Size("L")
                .Color("Black")
                .build();
    }

    @Test
    void addProduct() throws Exception {
        Product inputProduct = Product.builder()
                .Name("Shirt").Description("Black shirt").ImageURL("/shirt.jpg").CreationDate(LocalDate.now()).ExpirationDate(LocalDate.now())
                .Status("available").Size("L").Color("Black").build();
        Mockito.when(productService.addProduct(inputProduct)).thenReturn(product);

        mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\n" +
                        "    \"Name\":\"Shirt\",\n" +
                        "    \"Description\":\"Black shirt\",\n" +
                        "    \"ImageURL\": \"/shirt.jpg\",\n" +
                        "    \"CreationDate\":\"2022-10-27\",\n" +
                        "    \"ExpirationDate\":\"2022-10-27\",\n" +
                        "    \"Status\": \"available\",\n" +
                        "    \"Size\": \"L\",\n" +
                        "    \"Color\": \"Black\"\n" +
                        "}\n"))
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