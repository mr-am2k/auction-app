package com.internship.auctionapp.controllers;

import com.internship.auctionapp.domainmodels.Product;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.requests.CreateProductRequest;
import com.internship.auctionapp.services.ProductService;
import com.internship.auctionapp.util.DateUtils;
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
                .imageURL(IMAGES)
                .price(52.20)
                .expirationDateTime(LocalDateTime.now())
                .build();

        RETURN_PRODUCT = Product.builder()
                .id(PRODUCT_ID)
                .name("Shirt")
                .description("Black shirt")
                .imageURL(IMAGES)
                .price(52.20)
                .creationDateTime(LocalDateTime.now())
                .expirationDateTime(LocalDateTime.now())
                .bids(new ArrayList<>())
                .remainingTime("expired")
                .build();

        PRODUCT_1 = ProductEntity.builder()
                .id(PRODUCT_ID)
                .name("Shirt")
                .description("Black shirt")
                .imageURL(IMAGES)
                .price(52.20)
                .creationDateTime(LocalDateTime.now())
                .expirationDateTime(LocalDateTime.now())
                .build();

        PRODUCT_2 = ProductEntity.builder()
                .id(PRODUCT_ID)
                .name("Shoes")
                .description("Black shoes")
                .imageURL(IMAGES)
                .price(75.20)
                .creationDateTime(LocalDateTime.of(2022, 12, 12, 12, 12, 12))
                .expirationDateTime(LocalDateTime.of(2023, 1, 1, 1, 1, 1))
                .build();
    }

    @Test
    void addProduct() throws Exception {
        Mockito.when(productService.addProduct(SEND_PRODUCT)).thenReturn(PRODUCT_1.toDomainModel());

        mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\n" +
                        "\"name\":\"Shirt\",\n" +
                        "\"description\":\"Black shirt\",\n" +
                        "\"imageURL\": [\"https://underarmour.scene7.com/is/image/Underarmour/" +
                        "PS1306443-001_HF?rp=standard-0pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on," +
                        "on&bgc=F0F0F0&wid=566&hei=708size=566,708\", \"https://encrypted-tbn0.gstatic.com/images?q=" +
                        "tbn:ANd9GcTGyiH5Aej95fsvI0dHjPRMD3vsnDE98iIQWg&usqp=CAU\", \"https://www.champion.com.au/" +
                        "media/catalog/product/cache9890eac9b882d8eab76fc4de618372e9/A/V/AV8HN_BLK_EE_1.jpg\"],\n" +
                        "\"price\": 52.20,\n" +
                        "\"creationDate\":\"2022-10-27\",\n" +
                        "\"expirationDate\":\"2022-10-27\"\n" +
                        "}"
                )).andExpect(status().isOk());
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

    @Test
    void getRandomProduct() throws Exception {
        Mockito.when(productService.getRandomProduct()).thenReturn(RETURN_PRODUCT);
        mockMvc.perform(get("/api/v1/products/random")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(PRODUCT_1.getName()));
    }
}