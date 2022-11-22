package com.internship.auctionapp.services;

import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.repositories.product.ProductJPARepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class DefaultProductServiceTest {
    @Autowired
    private ProductService productService;

    @MockBean
    private ProductJPARepository productJPARepository;

    private List<String> IMAGES = List.of("https://underarmour.scene7.com/is/image/Underarmour/PS1306443-001_HF?rp=" +
                    "standard-0pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&" +
                    "cache=on,on&bgc=F0F0F0&wid=566&hei=708&size=566,708",
            "https://encrypted-tbn0.gstatic.com/images?" +
                    "q=tbn:ANd9GcTGyiH5Aej95fsvI0dHjPRMD3vsnDE98iIQWg&usqp=CAU",
            "https://www.champion.com.au/media/catalog/product/cache/" +
                    "9890eac9b882d8eab76fc4de618372e9/A/V/AV8HN_BLK_EE_1.jpg");

    private static final UUID PRODUCT_ID = UUID.fromString("3fa85f64-5717-4562-b3fc-2c963f66afa6");

    @BeforeEach
    void setUp() {
        ProductEntity product = ProductEntity.builder()
                .id(PRODUCT_ID)
                .name("Shirt")
                .description("Black shirt")
                .imageURLs(IMAGES)
                .price(52.20)
                .creationDateTime(LocalDateTime.now())
                .expirationDateTime(LocalDateTime.now())
                .build();
        Mockito.when(productJPARepository.findById(UUID.fromString("3fa85f64-5717-4562-b3fc-2c963f66afa6"))).thenReturn(Optional.of(product));
        Mockito.when(productJPARepository.getRandomProduct()).thenReturn(List.of(product));
    }

    @Test
    public void whenValidId_thenProductShouldBeFound() {
        String name = "Shirt";
        List<String> imageURL = IMAGES;
        String description = "Black shirt";
        Double price = 52.20;

        Product wantedProduct = productService.getSingleProduct(PRODUCT_ID).get(0);

        assertEquals(PRODUCT_ID, wantedProduct.getId());
        assertEquals(name, wantedProduct.getName());
        assertEquals(description, wantedProduct.getDescription());
        assertEquals(imageURL, wantedProduct.getImageURLs());
        assertEquals(price, wantedProduct.getPrice());
    }

    @Test
    public void getRandomProduct() {
        String name = "Shirt";
        List<String> imageURL = IMAGES;
        String description = "Black shirt";
        Double price = 52.20;

        Product wantedProduct = productService.getRandomProduct().get(0);

        assertEquals(PRODUCT_ID, wantedProduct.getId());
        assertEquals(name, wantedProduct.getName());
        assertEquals(description, wantedProduct.getDescription());
        assertEquals(imageURL, wantedProduct.getImageURLs());
        assertEquals(price, wantedProduct.getPrice());
    }
}