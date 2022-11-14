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

    private Product PRODUCT;

    private Product PRODUCT2;

    private List<String> IMAGES = new ArrayList<>() {{
        add("https://underarmour.scene7.com/is/image/Underarmour/PS1306443-001_HF?rp=" +
                "standard-0pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&" +
                "cache=on,on&bgc=F0F0F0&wid=566&hei=708&size=566,708");
        add("https://encrypted-tbn0.gstatic.com/images?" +
                "q=tbn:ANd9GcTGyiH5Aej95fsvI0dHjPRMD3vsnDE98iIQWg&usqp=CAU");
        add("https://www.champion.com.au/media/catalog/product/cache/" +
                "9890eac9b882d8eab76fc4de618372e9/A/V/AV8HN_BLK_EE_1.jpg");
    }};

    private static final UUID PRODUCT_ID = UUID.fromString("3fa85f64-5717-4562-b3fc-2c963f66afa6");

    @BeforeEach
    void setUp() {
        PRODUCT = Product.builder()
                .id(PRODUCT_ID)
                .name("Shirt")
                .description("Black shirt")
                .imageURL(IMAGES)
                .price(52.20)
                .creationDateTime(LocalDateTime.now())
                .expirationDateTime(LocalDateTime.now())
                .build();

        PRODUCT2 = Product.builder()
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
        Mockito.when(productService.addProduct(PRODUCT)).thenReturn(PRODUCT);

        mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                       "{\n" +
                               "\"name\":\"Shirt\",\n" +
                               " \"description\":\"Black shirt\",\n" +
                               " \"imageURL\": [\"https://underarmour.scene7.com/is/image/Underarmour/PS1306443-001_HF?rp=standard-0pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on,on&bgc=F0F0F0&wid=566&hei=708size=566,708\", \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGyiH5Aej95fsvI0dHjPRMD3vsnDE98iIQWg&usqp=CAU\", \"https://www.champion.com.au/media/catalog/product/cache9890eac9b882d8eab76fc4de618372e9/A/V/AV8HN_BLK_EE_1.jpg\"],\n" +
                               "\"price\": 52.20,\n" +
                               " \"creationDate\":\"2022-10-27\",\n" +
                               " \"expirationDate\":\"2022-10-27\"\n" +
                               "}"
                )).andExpect(status().isOk());
    }

    @Test
    void getSingleProduct() throws Exception {
        Mockito.when(productService.getSingleProduct(UUID.fromString("3fa85f64-5717-4562-b3fc-2c963f66afa6"))).thenReturn(PRODUCT);
        mockMvc.perform(get("/api/v1/products/3fa85f64-5717-4562-b3fc-2c963f66afa6")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value(PRODUCT.getDescription()));
    }

    @Test
    void getRandomProduct() throws Exception {
        Mockito.when(productService.getRandomProduct()).thenReturn(PRODUCT);
        mockMvc.perform(get("/api/v1/products/random")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(PRODUCT.getName()));
    }

    @Test
    void getProductsByCriteria() throws Exception {
        List<Product> products = new ArrayList<>();
        products.add(PRODUCT);
        products.add(PRODUCT2);
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