package com.internship.auctionapp.repositories.product;

import com.internship.auctionapp.entities.CategoryEntity;
import com.internship.auctionapp.entities.CreditCardEntity;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.repositories.category.CategoryJpaRepository;
import com.internship.auctionapp.repositories.creditCard.CreditCardJpaRepository;
import com.internship.auctionapp.util.ProductSortCriteria;
import com.internship.auctionapp.util.filter.FilterAndSortBuilder;
import com.internship.auctionapp.util.filter.ProductFilter;
import com.internship.auctionapp.util.filter.ProductSpecification;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ProductJpaRepositoryTest {

    @Autowired
    private ProductJpaRepository productJpaRepository;

    @Autowired
    private CategoryJpaRepository categoryJpaRepository;

    @Autowired
    private CreditCardJpaRepository creditCardJpaRepository;

    private static final UUID PRODUCT_ID = UUID.fromString("3fa85f64-5717-4562-b3fc-2c963f66afa6");

    private static final UUID PRODUCT_ID_1 = UUID.fromString("164c9ebb-52dd-48f2-b988-bb4e349782c0");

    private final List<String> IMAGES = List.of("https://underarmour.scene7.com/is/image/Underarmour/PS1306443-001_HF?rp=" +
                    "standard-0pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&" +
                    "cache=on,on&bgc=F0F0F0&wid=566&hei=708&size=566,708",
            "https://encrypted-tbn0.gstatic.com/images?" +
                    "q=tbn:ANd9GcTGyiH5Aej95fsvI0dHjPRMD3vsnDE98iIQWg&usqp=CAU",
            "https://www.champion.com.au/media/catalog/product/cache/" +
                    "9890eac9b882d8eab76fc4de618372e9/A/V/AV8HN_BLK_EE_1.jpg"
    );

    @BeforeEach
    void setUp() {
        final CategoryEntity category = CategoryEntity.builder()
                .name("Category")
                .build();

        categoryJpaRepository.save(category);
        final CategoryEntity firstCategory = categoryJpaRepository.findAll().get(0);

        final CategoryEntity category1 = CategoryEntity.builder()
                .name("Category1")
                .build();

        categoryJpaRepository.save(category1);
        final CategoryEntity secondCategory = categoryJpaRepository.findAll().get(1);

        final CategoryEntity subcategory = CategoryEntity.builder()
                .name("Subcategory")
                .parentCategoryId(firstCategory.getId())
                .build();

        categoryJpaRepository.save(subcategory);
        final CategoryEntity firstSubcategory = categoryJpaRepository.findAll().get(2);

        final CategoryEntity subcategory1 = CategoryEntity.builder()
                .name("Subcategory")
                .parentCategoryId(secondCategory.getId())
                .build();

        categoryJpaRepository.save(subcategory1);
        final CategoryEntity secondSubcategory = categoryJpaRepository.findAll().get(3);

        final CreditCardEntity creditCard = CreditCardEntity.builder().build();

        creditCardJpaRepository.save(creditCard);
        final CreditCardEntity card = creditCardJpaRepository.findAll().get(0);

        final ProductEntity product = ProductEntity.builder()
                .id(PRODUCT_ID)
                .name("First")
                .description("Description")
                .imageURLs(IMAGES)
                .startPrice(50.0)
                .creationDateTime(ZonedDateTime.of(LocalDateTime.now().minus(10, ChronoUnit.DAYS), ZoneOffset.UTC))
                .expirationDateTime(ZonedDateTime.of(LocalDateTime.now().plus(10, ChronoUnit.DAYS), ZoneOffset.UTC))
                .category(firstCategory)
                .subcategory(firstSubcategory)
                .creditCard(card)
                .build();

        productJpaRepository.save(product);

        final ProductEntity product1 = ProductEntity.builder()
                .id(PRODUCT_ID_1)
                .name("Second")
                .description("Description")
                .imageURLs(IMAGES)
                .startPrice(30.0)
                .creationDateTime(ZonedDateTime.of(LocalDateTime.now().minus(5, ChronoUnit.DAYS), ZoneOffset.UTC))
                .expirationDateTime(ZonedDateTime.of(LocalDateTime.now().plus(5, ChronoUnit.DAYS), ZoneOffset.UTC))
                .category(secondCategory)
                .subcategory(secondSubcategory)
                .creditCard(card)
                .build();

        productJpaRepository.save(product1);
    }

    @Test
    void return_products_by_name() {
        final ProductFilter productFilter = new FilterAndSortBuilder()
                .name("First")
                .build();

        final ProductSpecification productSpecification = new ProductSpecification(productFilter, 0);

        final Specification<ProductEntity> filterSpecification = productSpecification.toFilterSpecification();

        final Page<ProductEntity> results = productJpaRepository.findAll(filterSpecification, productSpecification.toPage());

        assertEquals("First", results.getContent().get(0).getName());
        assertEquals(1, results.getContent().size());
    }

    @Test
    void return_products_by_category_id() {
        final CategoryEntity category = categoryJpaRepository.findAll().get(0);

        final ProductFilter productFilter = new FilterAndSortBuilder()
                .categoryId(category.getId())
                .build();

        final ProductSpecification productSpecification = new ProductSpecification(productFilter, 0);

        final Specification<ProductEntity> filterSpecification = productSpecification.toFilterSpecification();

        final Page<ProductEntity> results = productJpaRepository.findAll(filterSpecification, productSpecification.toPage());

        assertNotNull(results.getContent());
    }

    @Test
    void return_products_by_subcategory_id() {
        final CategoryEntity subcategory = categoryJpaRepository.findAll().get(3);

        final List<UUID> subcategoryIds = Collections.singletonList(subcategory.getId());

        final ProductFilter productFilter = new FilterAndSortBuilder()
                .subcategoryIds(subcategoryIds)
                .build();

        final ProductSpecification productSpecification = new ProductSpecification(productFilter, 0);

        final Specification<ProductEntity> filterSpecification = productSpecification.toFilterSpecification();

        final Page<ProductEntity> results = productJpaRepository.findAll(filterSpecification, productSpecification.toPage());

        assertNotNull(results.getContent());
    }

    @Test
    void return_products_by_subcategory_ids() {
        final CategoryEntity subcategory1 = categoryJpaRepository.findAll().get(3);
        final CategoryEntity subcategory2 = categoryJpaRepository.findAll().get(4);

        final List<UUID> subcategoryIds = Arrays.asList(subcategory1.getId(), subcategory2.getId());

        final ProductFilter productFilter = new FilterAndSortBuilder()
                .subcategoryIds(subcategoryIds)
                .build();

        final ProductSpecification productSpecification = new ProductSpecification(productFilter, 0);

        final Specification<ProductEntity> filterSpecification = productSpecification.toFilterSpecification();

        final Page<ProductEntity> results = productJpaRepository.findAll(filterSpecification, productSpecification.toPage());

        assertNotNull(results.getContent());
    }

    @Test
    void return_products_by_min_price() {
        final ProductFilter productFilter = new FilterAndSortBuilder()
                .minPrice(40.0)
                .build();

        final ProductSpecification productSpecification = new ProductSpecification(productFilter, 0);

        final Specification<ProductEntity> filterSpecification = productSpecification.toFilterSpecification();

        final Page<ProductEntity> results = productJpaRepository.findAll(filterSpecification, productSpecification.toPage());

        assertNotNull(results.getContent());
    }

    @Test
    void return_products_by_max_price() {
        final ProductFilter productFilter = new FilterAndSortBuilder()
                .maxPrice(40.0)
                .build();

        final ProductSpecification productSpecification = new ProductSpecification(productFilter, 0);

        final Specification<ProductEntity> filterSpecification = productSpecification.toFilterSpecification();

        final Page<ProductEntity> results = productJpaRepository.findAll(filterSpecification, productSpecification.toPage());

        assertNotNull(results.getContent());
    }

    @Test
    void return_products_with_several_filters() {
        final ProductFilter productFilter = new FilterAndSortBuilder()
                .name("First")
                .minPrice(30.0)
                .maxPrice(60.0)
                .sortCriteria(ProductSortCriteria.PRICE_DESC)
                .build();

        final ProductSpecification productSpecification = new ProductSpecification(productFilter, 0);

        final Specification<ProductEntity> filterSpecification = productSpecification.toFilterSpecification();

        final Page<ProductEntity> results = productJpaRepository.findAll(filterSpecification, productSpecification.toPage());

        assertNotNull(results.getContent());
    }
}