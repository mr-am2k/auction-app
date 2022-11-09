package com.internship.auctionapp.controllers;

import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.services.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    private Product product;

    private Product product2;

    private static final UUID PRODUCT_ID = UUID.fromString("3fa85f64-5717-4562-b3fc-2c963f66afa6");

    @BeforeEach
    void setUp() {
        product = Product.builder()
                .id(PRODUCT_ID)
                .name("Shirt")
                .description("Black shirt")
                .imageURL("/shirt.jpg")
                .price(52.20)
                .creationDateTime(LocalDateTime.now())
                .expirationDateTime(LocalDateTime.now())
                .build();

        product2 = Product.builder()
                .id(PRODUCT_ID)
                .name("Shoes")
                .description("Black shoes")
                .imageURL("/shoes.jpg")
                .price(75.20)
                .creationDateTime(LocalDateTime.of(2022, 12, 12, 12, 12, 12))
                .expirationDateTime(LocalDateTime.of(2023, 1, 1, 1, 1, 1))
                .build();
    }

    @Test
    void addProduct() throws Exception {
        Mockito.when(productService.addProduct(product)).thenReturn(product);

        mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        """
                                {
                                    "name":"Shirt",
                                    "description":"Black shirt",
                                    "imageURL": "/shirt.jpg",
                                    "price": 52.20,
                                    "creationDate":"2022-10-27",
                                    "expirationDate":"2022-10-27"
                                }
                                                        
                        """
                )).andExpect(status().isOk());
    }

    @Test
    void getSingleProduct() throws Exception {
        Mockito.when(productService.getSingleProduct(UUID.fromString("3fa85f64-5717-4562-b3fc-2c963f66afa6"))).thenReturn(product);
        mockMvc.perform(get("/api/v1/products/3fa85f64-5717-4562-b3fc-2c963f66afa6")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value(product.getDescription()));
    }

    @Test
    void getRandomProduct() throws Exception {
        Mockito.when(productService.getRandomProduct()).thenReturn(product);
        mockMvc.perform(get("/api/v1/products/random")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(product.getName()));
    }

    @Test
    void getProductsByCriteria() throws Exception {
        List<Product> products = new ArrayList<>();
        products.add(product);
        products.add(product2);
        Page<Product> page = new PageImpl<Product>(products);
        Mockito.when(productService.getProductsByCriteria("last-chance")).thenReturn(page);
        mockMvc.perform(get("/api/v1/products/search?criteria=last-chance").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.numberOfElements").value(page.getNumberOfElements()));

        Mockito.when(productService.getProductsByCriteria("new-arrival")).thenReturn(page);
        mockMvc.perform(get("/api/v1/products/search?criteria=new-arrival").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.numberOfElements").value(page.getNumberOfElements()));
    }
}