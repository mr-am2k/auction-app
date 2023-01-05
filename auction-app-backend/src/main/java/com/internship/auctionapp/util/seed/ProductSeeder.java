package com.internship.auctionapp.util.seed;

import com.internship.auctionapp.entities.CategoryEntity;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.models.Category;
import com.internship.auctionapp.repositories.card.CardJpaRepository;
import com.internship.auctionapp.repositories.category.CategoryJpaRepository;
import com.internship.auctionapp.repositories.product.ProductJpaRepository;
import com.internship.auctionapp.repositories.user.UserJpaRepository;
import com.internship.auctionapp.util.UserRole;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

import java.util.List;
import java.util.UUID;

@Component
public class ProductSeeder implements CommandLineRunner {
    final ProductJpaRepository productRepository;

    private final UserJpaRepository userRepository;

    private final PasswordEncoder encoder;

    String PRODUCT_DESCRIPTION = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
            "Vestibulum hendrerit odio a erat lobortis auctor. " +
            "Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. " +
            "Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst. ";

    String USER_ID = "ccd5d47b-a868-4a3d-ba39-6e966ccaa24e";
    private final CategoryJpaRepository categoryJpaRepository;
    private final CardJpaRepository cardJpaRepository;

    public ProductSeeder(ProductJpaRepository productRepository, UserJpaRepository userRepository, PasswordEncoder encoder,
                         CategoryJpaRepository categoryJpaRepository,
                         CardJpaRepository cardJpaRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.categoryJpaRepository = categoryJpaRepository;
        this.cardJpaRepository = cardJpaRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        seedData();
    }

    public void seedData() {
        if (productRepository.count() == 0) {
            if (userRepository.count() == 0) {
                final UserEntity user = new UserEntity();

                user.setId(UUID.fromString(USER_ID));
                user.setFirstName("Muamer");
                user.setLastName("Alickovic");
                user.setUsername("alickovicmuamer@gmail.com");
                user.setEmail("alickovicmuamer@gmail.com");
                user.setPasswordHash(encoder.encode("Pa$$w0rd"));
                user.setPhoneNumber("061-061-061");
                user.setRole(UserRole.ROLE_ADMIN);

                userRepository.save(user);
            }

            final UserEntity user1 = userRepository.findAll().get(0);

            final CategoryEntity category = new CategoryEntity();

            category.setName("Woman");

            categoryJpaRepository.save(category);

            final CategoryEntity category1 = categoryJpaRepository.findAll().get(0);

            final CategoryEntity subcategory1 = new CategoryEntity();
            final CategoryEntity subcategory2 = new CategoryEntity();
            final CategoryEntity subcategory3 = new CategoryEntity();
            final CategoryEntity subcategory4 = new CategoryEntity();

            subcategory1.setName("Accessories");
            subcategory1.setParentCategoryId(category1.getId());
            categoryJpaRepository.save(subcategory1);

            subcategory2.setName("Bag");
            subcategory2.setParentCategoryId(category1.getId());
            categoryJpaRepository.save(subcategory2);

            subcategory3.setName("Bad & Bath");
            subcategory3.setParentCategoryId(category1.getId());
            categoryJpaRepository.save(subcategory3);

            subcategory4.setName("Spot Tops & Shoes");
            subcategory4.setParentCategoryId(category1.getId());
            categoryJpaRepository.save(subcategory4);

            List<CategoryEntity> subcategories = categoryJpaRepository.findAll();

            final ProductEntity product1 = new ProductEntity("Running Shoes",
                    PRODUCT_DESCRIPTION,
                    List.of("https://media.cntraveler.com/photos/62e7cbd7af14e65bfedc7cd0/master/w_2100,h_1500,c_limit/" +
                                    "Best%20Running%20Shoes-2022_Hoka%20Rincon%203%20Men.jpg",
                            "https://i.insider.com/5e84e28f2d654f2c2469cc6b?width=1136&format=jpeg",
                            "https://hips.hearstapps.com/hmg-prod/images/" +
                                    "run-flat-footed-runningshoes-1642804867.jpg"),
                    55.50,
                    ZonedDateTime.now(ZoneOffset.UTC),
                    ZonedDateTime.of(LocalDateTime.of(2023, 12, 12, 19, 30, 40), ZoneOffset.UTC),
                    user1, subcategories.get(1));

            final ProductEntity product2 = new ProductEntity("Black shirt",
                    PRODUCT_DESCRIPTION,
                    List.of("https://pyxis.nymag.com/v1/imgs/a88/914/1abfe54a4c29e33a6a86c7cb386644d71c-7----.2x." +
                                    "rhorizontal.w600.jpg",
                            "https://cdn.shopify.com/s/files/1/0752/6435/products/" +
                                    "IMG_0272_734768d7-e51a-4416-832a-0c873edf027c.jpg?v=1650634953",
                            "https://media.gq.com/photos/602ea742937235d39fc1315b/master/" +
                                    "w_2000,h_1334,c_limit/sunspel.jpg"
                    ),
                    25.25,
                    ZonedDateTime.now(ZoneOffset.UTC),
                    ZonedDateTime.of(LocalDateTime.of(2023, 05, 11, 11, 20, 23), ZoneOffset.UTC),
                    user1, subcategories.get(2));

            final ProductEntity product3 = new ProductEntity("Nike Air Force",
                    PRODUCT_DESCRIPTION,
                    List.of("https://images.complex.com/complex/images/c_scale,f_auto,q_auto,w_1920/fl_lossy," +
                                    "pg_1/iot1dbjmzr7z6kfkoxrb/nike-air-force-1-lead-1?fimg-ssr-default",
                            "https://static.nike.com/a/images/t_default/da1668ca-6dc5-4c00-879e-" +
                                    "77f8b9587e67/air-force-1-07-shoe-NMmm1B.png",
                            "https://n.nordstrommedia.com/id/sr3/e3de6e99-07a2-4739-9e0f-adf90a22c11e.jpeg?" +
                                    "crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838"
                    ),
                    125.50,
                    ZonedDateTime.now(ZoneOffset.UTC),
                    ZonedDateTime.of(LocalDateTime.of(2022, 12, 12, 15, 15, 15), ZoneOffset.UTC),
                    user1, subcategories.get(3));

            final ProductEntity product4 = new ProductEntity("Coat",
                    PRODUCT_DESCRIPTION,
                    List.of("https://i.pinimg.com/originals/2b/71/37/2b7137b29ac5414cb148894dddc0fdc2.jpg",
                            "https://images.express.com/is/image/expressfashion/0037_06215332_2834?" +
                                    "cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&" +
                                    "efaultImage=Photo-Coming-Soon",
                            "https://media.boohoo.com/i/boohoo/m7625914198143_black_xl_1.jpeg"
                    ),
                    91.99,
                    ZonedDateTime.now(ZoneOffset.UTC),
                    ZonedDateTime.of(LocalDateTime.of(2023, 4, 9, 21, 14, 44), ZoneOffset.UTC),
                    user1, subcategories.get(4));

            final ProductEntity product5 = new ProductEntity("Summer shirt",
                    PRODUCT_DESCRIPTION,
                    List.of(
                            "https://static.footshop.com/755008-full_product/222031.jpg",
                            "https://www.thecoolector.com/wp-content/uploads/2020/04/huck-1-1050x700.jpg",
                            "https://encrypted-tbn0.gstatic.com/images?" +
                                    "q=tbn:ANd9GcRbB04TMVGpXE-ehT9imIF5ElfdrS6T6tHdVA&usqp=CAU"
                    ),
                    15.50,
                    ZonedDateTime.now(ZoneOffset.UTC),
                    ZonedDateTime.of(LocalDateTime.of(2024, 12, 12, 12, 12, 12), ZoneOffset.UTC),
                    user1, subcategories.get(1));

            final ProductEntity product6 = new ProductEntity("Shorts",
                    PRODUCT_DESCRIPTION,
                    List.of("https://underarmour.scene7.com/is/image/Underarmour/PS1306443-001_HF?rp=" +
                                    "standard-0pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&" +
                                    "cache=on,on&bgc=F0F0F0&wid=566&hei=708&size=566,708",
                            "https://encrypted-tbn0.gstatic.com/images?" +
                                    "q=tbn:ANd9GcTGyiH5Aej95fsvI0dHjPRMD3vsnDE98iIQWg&usqp=CAU",
                            "https://www.champion.com.au/media/catalog/product/cache/" +
                                    "9890eac9b882d8eab76fc4de618372e9/A/V/AV8HN_BLK_EE_1.jpg"
                    ),
                    25.25,
                    ZonedDateTime.now(ZoneOffset.UTC),
                    ZonedDateTime.of(LocalDateTime.of(2024, 9, 12, 9, 45, 11), ZoneOffset.UTC),
                    user1, subcategories.get(1));

            final ProductEntity product7 = new ProductEntity("Jacket",
                    PRODUCT_DESCRIPTION,
                    List.of("https://cdn.shopify.com/s/files/1/0419/1525/products/1024x1024-" +
                                    "Men-Moto-Tobacco-050322-1.jpg?v=1652112663",
                            "https://cdn.shopify.com/s/files/1/0419/1525/products/" +
                                    "1024x1024-Men-Jacket-Keanu-BlackMatte-091721-1.jpg?v=1632508569",
                            "https://cdn.shopify.com/s/files/1/0419/1525/products/1024x1024-" +
                                    "Mens-Jacket-Keanu-BlackMatte-091721-FrontZipped.jpg?v=1632508562"
                    ),
                    75.50,
                    ZonedDateTime.now(ZoneOffset.UTC),
                    ZonedDateTime.of(LocalDateTime.of(2023, 3, 3, 3, 3, 3), ZoneOffset.UTC),
                    user1, subcategories.get(2));

            final ProductEntity product8 = new ProductEntity("Simpson Socks",
                    PRODUCT_DESCRIPTION,
                    List.of("https://www.stance.com/dw/image/v2/BGWC_PRD/on/demandware.static/-/" +
                                    "Sites-GlobalProductCatalog/default/dwd153fd50/images/" +
                                    "products/A556A22BAR_WHT.jpg?sw=800&sh=800",
                            "https://encrypted-tbn0.gstatic.com/images?" +
                                    "q=tbn:ANd9GcSz4PeeFfbGi6a7L348o6vmmA_MB3fAXEfaSA&usqp=CAU",
                            "https://img.shopstyle-cdn.com/sim/1b/14/" +
                                    "1b140eff2fe08ec3f9b3596a1623004e_xlarge/" +
                                    "the-simpsonstm-gender-neutral-socks-for-adults.jpg"
                    ),
                    9.50,
                    ZonedDateTime.now(ZoneOffset.UTC),
                    ZonedDateTime.of(LocalDateTime.of(2023, 11, 11, 12, 12, 11), ZoneOffset.UTC),
                    user1, subcategories.get(3));

            final ProductEntity product9 = new ProductEntity("Ring",
                    PRODUCT_DESCRIPTION,
                    List.of("https://upload.wikimedia.org/wikipedia/commons/d/d4/One_Ring_Blender_Render.png",
                            "https://www.wetanz.com/media/catalog/product/cache/" +
                                    "0c729873665a1c695396984e8457e603/1/4/1468044588cb6de1ae583f9a6ad2b28cc2e90e0f5b.jpg",
                            "https://i.insider.com/5c9df52092c88634ba266b74?width=1000&format=jpeg&auto=webp"
                    ),
                    12.45,
                    ZonedDateTime.now(ZoneOffset.UTC),
                    LocalDateTime.of(2025, 12, 12, 7, 23, 12).atZone(ZoneOffset.UTC),
                    user1, subcategories.get(4));

            final ProductEntity product10 = new ProductEntity("Watch",
                    PRODUCT_DESCRIPTION,
                    List.of("https://m.media-amazon.com/images/I/71C3rHLQItL._AC_UL1347_.jpg",
                            "https://5.imimg.com/data5/OJ/VU/MY-10732933/hand-watch-500x500.jpg",
                            "https://5.imimg.com/data5/FN/FI/MY-34063937/mens-hand-watch-500x500.jpg"
                    ),
                    85.50,
                    ZonedDateTime.now(ZoneOffset.UTC),
                    ZonedDateTime.of(LocalDateTime.of(2024, 7, 12, 14, 12, 9), ZoneOffset.UTC),
                    user1, subcategories.get(4));

            productRepository.save(product1);
            productRepository.save(product2);
            productRepository.save(product3);
            productRepository.save(product4);
            productRepository.save(product5);
            productRepository.save(product6);
            productRepository.save(product7);
            productRepository.save(product8);
            productRepository.save(product9);
            productRepository.save(product10);
        }
    }
}
