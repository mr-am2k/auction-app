package com.internship.auctionapp.util;

import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;


@Component
public class ProductSeeder implements CommandLineRunner {

    final ProductRepository productRepository;

    String productDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst. ";

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
                    "https://d1fufvy4xao6k9.cloudfront.net/images/landings/421/brown-captoe-shoes-5.webp",
                    55.50,
                    LocalDateTime.now(),
                    LocalDateTime.of(2023, 12, 12, 19, 30, 40));

            Product product2 = new Product("Black shirt",
                    productDescription,
                    "https://img.freepik.com/free-photo/ironic-thoughtful-handsome-young-man-with-afro-wearing-black-sleeveless-cotton-t-shirt-white-wall_346278-1011.jpg?w=2000",
                    25.25,
                    LocalDateTime.now(),
                    LocalDateTime.of(2023, 05, 11, 11, 20, 23));

            Product product3 = new Product("Nike Air Force",
                    productDescription,
                    "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e125b578-4173-401a-ab13-f066979c8848/air-force-1-big-kids-shoes-M7mcL9.png",
                    125.50,
                    LocalDateTime.now(),
                    LocalDateTime.of(2022, 12, 12, 15,15,15));

            Product product4 = new Product("Coat",
                    productDescription,
                    "https://cdni.llbean.net/is/image/wim/260347_2772_41?hei=1095&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2",
                    91.99,
                    LocalDateTime.now(),
                    LocalDateTime.of(2023, 4, 9, 21, 14, 44));

            Product product5 = new Product("Summer shirt",
                    productDescription,
                    "https://static.footshop.com/755008-full_product/222031.jpg",
                    15.50,
                    LocalDateTime.now(),
                    LocalDateTime.of(2024, 12, 12, 12, 12, 12));

            Product product6 = new Product("Shorts",
                    productDescription,
                    "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/2264a97b-848e-4278-8733-3c46da5c1a0c/dri-fit-golf-shorts-QNrCtG.png",
                    25.25,
                    LocalDateTime.now(),
                    LocalDateTime.of(2024, 9, 12, 9, 45, 11));

            Product product7 = new Product("Jacket",
                    productDescription,
                    "https://cdn.shopify.com/s/files/1/0419/1525/products/1024x1024-Men-Moto-Tobacco-050322-1.jpg?v=1652112663",
                    75.50,
                    LocalDateTime.now(),
                    LocalDateTime.of(2023, 3, 3, 3, 3, 3));

            Product product8 = new Product("Simson Socks",
                    productDescription,
                    "https://www.stance.com/dw/image/v2/BGWC_PRD/on/demandware.static/-/Sites-GlobalProductCatalog/default/dwd153fd50/images/products/A556A22BAR_WHT.jpg?sw=800&sh=800",
                    9.50,
                    LocalDateTime.now(),
                    LocalDateTime.of(2023, 11, 11, 12, 12, 11));

            Product product9 = new Product("Ring",
                    productDescription,
                    "https://image.brilliantearth.com/media/diamond_ring_vto/8T/BE1D64_white_Round_top_75_carat.png",
                    12.45,
                    LocalDateTime.now(),
                    LocalDateTime.of(2025, 12, 12, 7, 23, 12));

            Product product10 = new Product("Watch",
                    productDescription,
                    "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/wearables/watch-d/img/pc/huawei-watch-d-design.png",
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
