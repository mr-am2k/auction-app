package com.internship.auctionapp.controllers;

import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.requests.CreateProductRequest;
import com.internship.auctionapp.services.product.ProductService;
import com.internship.auctionapp.util.DateUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
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

    private CreateProductRequest SEND_PRODUCT;

    private Product RETURN_PRODUCT;

    private ProductEntity PRODUCT_1;

    private ProductEntity PRODUCT_2;

    private List<String> IMAGES = List.of("https://underarmour.scene7.com/is/image/Underarmour/PS1306443-001_HF?rp=" +
                    "standard-0pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&" +
                    "cache=on,on&bgc=F0F0F0&wid=566&hei=708&size=566,708",
            "https://encrypted-tbn0.gstatic.com/images?" +
                    "q=tbn:ANd9GcTGyiH5Aej95fsvI0dHjPRMD3vsnDE98iIQWg&usqp=CAU",
            "https://www.champion.com.au/media/catalog/product/cache/" +
                    "9890eac9b882d8eab76fc4de618372e9/A/V/AV8HN_BLK_EE_1.jpg"
    );

    private static final UUID PRODUCT_ID = UUID.fromString("3fa85f64-5717-4562-b3fc-2c963f66afa6");

    private DateUtils dateDifference = new DateUtils();

    @BeforeEach
    void setUp() {
        SEND_PRODUCT = CreateProductRequest.builder().
                name("Shirt")
                .description("Black shirt")
                .imageURLs(IMAGES)
                .startPrice(52.20)
                .creationDateTime(new Date())
                .expirationDateTime(new Date())
                .build();

        RETURN_PRODUCT = Product.builder()
                .id(PRODUCT_ID)
                .name("Shirt")
                .description("Black shirt")
                .imageURLs(IMAGES)
                .startPrice(52.20)
                .creationDateTime(ZonedDateTime.of(LocalDateTime.now(), ZoneOffset.UTC))
                .expirationDateTime(ZonedDateTime.of(LocalDateTime.now(), ZoneOffset.UTC))
                .bids(new ArrayList<>())
                .remainingTime("expired")
                .build();

        PRODUCT_1 = ProductEntity.builder()
                .id(PRODUCT_ID)
                .name("Shirt")
                .description("Black shirt")
                .imageURLs(IMAGES)
                .startPrice(52.20)
                .creationDateTime(ZonedDateTime.of(LocalDateTime.now(), ZoneOffset.UTC))
                .expirationDateTime(ZonedDateTime.of(LocalDateTime.now(), ZoneOffset.UTC))
                .build();

        PRODUCT_2 = ProductEntity.builder()
                .id(PRODUCT_ID)
                .name("Shoes")
                .description("Black shoes")
                .imageURLs(IMAGES)
                .startPrice(75.20)
                .creationDateTime(ZonedDateTime.of(
                        LocalDateTime.of(2022, 12, 12, 12, 12, 12), ZoneOffset.UTC))
                .expirationDateTime(ZonedDateTime.of(
                        LocalDateTime.of(2023, 1, 1, 1, 1, 1), ZoneOffset.UTC))
                .build();
    }

    @Test
    void getSingleProduct() throws Exception {
        Mockito.when(productService.getSingleProduct(UUID.fromString("3fa85f64-5717-4562-b3fc-2c963f66afa6")))
                .thenReturn(RETURN_PRODUCT);
        mockMvc.perform(get("/api/v1/products/3fa85f64-5717-4562-b3fc-2c963f66afa6")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value(PRODUCT_1.getDescription()));
    }
}