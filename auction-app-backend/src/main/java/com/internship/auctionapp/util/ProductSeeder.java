package com.internship.auctionapp.util;

import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class ProductSeeder implements CommandLineRunner {

    final ProductRepository productRepository;

    String productDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
            "Vestibulum hendrerit odio a erat lobortis auctor. " +
            "Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. " +
            "Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst. ";

    public ProductSeeder(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        seedData();
    }

    public void seedData() {
        System.out.println(productRepository.count());
        if (productRepository.count() == 0) {
            Product product1 = new Product("Running Shoes",
                    productDescription,
                    List.of("https://media.cntraveler.com/photos/62e7cbd7af14e65bfedc7cd0/master/w_2100,h_1500,c_limit/" +
                                    "Best%20Running%20Shoes-2022_Hoka%20Rincon%203%20Men.jpg",
                            "https://i.insider.com/5e84e28f2d654f2c2469cc6b?width=1136&format=jpeg",
                            "https://hips.hearstapps.com/hmg-prod/images/" +
                                    "run-flat-footed-runningshoes-1642804867.jpg"),
                    55.50,
                    LocalDateTime.now(),
                    LocalDateTime.of(2023, 12, 12, 19, 30, 40));

            Product product2 = new Product("Black shirt",
                    productDescription,
                    List.of("https://pyxis.nymag.com/v1/imgs/a88/914/1abfe54a4c29e33a6a86c7cb386644d71c-7----.2x." +
                                    "rhorizontal.w600.jpg",
                            "https://cdn.shopify.com/s/files/1/0752/6435/products/" +
                                    "IMG_0272_734768d7-e51a-4416-832a-0c873edf027c.jpg?v=1650634953",
                            "https://media.gq.com/photos/602ea742937235d39fc1315b/master/" +
                                    "w_2000,h_1334,c_limit/sunspel.jpg"
                    ),
                    25.25,
                    LocalDateTime.now(),
                    LocalDateTime.of(2023, 05, 11, 11, 20, 23));

            Product product3 = new Product("Nike Air Force",
                    productDescription,
                    List.of("https://images.complex.com/complex/images/c_scale,f_auto,q_auto,w_1920/fl_lossy," +
                                    "pg_1/iot1dbjmzr7z6kfkoxrb/nike-air-force-1-lead-1?fimg-ssr-default",
                            "https://static.nike.com/a/images/t_default/da1668ca-6dc5-4c00-879e-" +
                                    "77f8b9587e67/air-force-1-07-shoe-NMmm1B.png",
                            "https://n.nordstrommedia.com/id/sr3/e3de6e99-07a2-4739-9e0f-adf90a22c11e.jpeg?" +
                                    "crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838"
                    ),
                    125.50,
                    LocalDateTime.now(),
                    LocalDateTime.of(2022, 12, 12, 15, 15, 15));

            Product product4 = new Product("Coat",
                    productDescription,
                    List.of("https://i.pinimg.com/originals/2b/71/37/2b7137b29ac5414cb148894dddc0fdc2.jpg",
                            "https://images.express.com/is/image/expressfashion/0037_06215332_2834?" +
                                    "cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&" +
                                    "efaultImage=Photo-Coming-Soon",
                            "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/" +
                                    "/14311496/2021/9/21/27c1c6be-4025-4a72-b8f8-24f5708b54381632208425681-" +
                                    "Sztori-Plus-Size-Men-Grey-Melange-Solid-Regular-Fit-Casual-D-1.jpg"
                    ),
                    91.99,
                    LocalDateTime.now(),
                    LocalDateTime.of(2023, 4, 9, 21, 14, 44));

            Product product5 = new Product("Summer shirt",
                    productDescription,
                    List.of(
                            "https://static.footshop.com/755008-full_product/222031.jpg",
                            "https://www.thecoolector.com/wp-content/uploads/2020/04/huck-1-1050x700.jpg",
                            "https://encrypted-tbn0.gstatic.com/images?" +
                                    "q=tbn:ANd9GcRbB04TMVGpXE-ehT9imIF5ElfdrS6T6tHdVA&usqp=CAU"
                    ),
                    15.50,
                    LocalDateTime.now(),
                    LocalDateTime.of(2024, 12, 12, 12, 12, 12));

            Product product6 = new Product("Shorts",
                    productDescription,
                    List.of("https://underarmour.scene7.com/is/image/Underarmour/PS1306443-001_HF?rp=" +
                                    "standard-0pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&" +
                                    "cache=on,on&bgc=F0F0F0&wid=566&hei=708&size=566,708",
                            "https://encrypted-tbn0.gstatic.com/images?" +
                                    "q=tbn:ANd9GcTGyiH5Aej95fsvI0dHjPRMD3vsnDE98iIQWg&usqp=CAU",
                            "https://www.champion.com.au/media/catalog/product/cache/" +
                                    "9890eac9b882d8eab76fc4de618372e9/A/V/AV8HN_BLK_EE_1.jpg"
                    ),
                    25.25,
                    LocalDateTime.now(),
                    LocalDateTime.of(2024, 9, 12, 9, 45, 11));

            Product product7 = new Product("Jacket",
                    productDescription,
                    List.of("https://cdn.shopify.com/s/files/1/0419/1525/products/1024x1024-" +
                                    "Men-Moto-Tobacco-050322-1.jpg?v=1652112663",
                            "https://cdn.shopify.com/s/files/1/0419/1525/products/" +
                                    "1024x1024-Men-Jacket-Keanu-BlackMatte-091721-1.jpg?v=1632508569",
                            "https://cdn.shopify.com/s/files/1/0419/1525/products/1024x1024-" +
                                    "Mens-Jacket-Keanu-BlackMatte-091721-FrontZipped.jpg?v=1632508562"
                    ),
                    75.50,
                    LocalDateTime.now(),
                    LocalDateTime.of(2023, 3, 3, 3, 3, 3));

            Product product8 = new Product("Simpson Socks",
                    productDescription,
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
                    LocalDateTime.now(),
                    LocalDateTime.of(2023, 11, 11, 12, 12, 11));

            Product product9 = new Product("Ring",
                    productDescription,
                    List.of("https://upload.wikimedia.org/wikipedia/commons/d/d4/One_Ring_Blender_Render.png",
                            "https://www.wetanz.com/media/catalog/product/cache/" +
                                    "0c729873665a1c695396984e8457e603/1/4/1468044588cb6de1ae583f9a6ad2b28cc2e90e0f5b.jpg",
                            "https://i.insider.com/5c9df52092c88634ba266b74?width=1000&format=jpeg&auto=webp"
                    ),
                    12.45,
                    LocalDateTime.now(),
                    LocalDateTime.of(2025, 12, 12, 7, 23, 12));

            Product product10 = new Product("Watch",
                    productDescription,
                    List.of("https://m.media-amazon.com/images/I/71C3rHLQItL._AC_UL1347_.jpg",
                            "https://5.imimg.com/data5/OJ/VU/MY-10732933/hand-watch-500x500.jpg",
                            "https://5.imimg.com/data5/FN/FI/MY-34063937/mens-hand-watch-500x500.jpg"
                    ),
                    85.50,
                    LocalDateTime.now(),
                    LocalDateTime.of(2024, 7, 12, 14, 12, 9));

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
