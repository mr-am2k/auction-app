package com.internship.auctionapp.repositories.product;

import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.requests.CreateProductRequest;
import com.internship.auctionapp.services.DefaultProductService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class DefaultProductRepository implements ProductRepository {
    private final ProductJPARepository productJPARepository;

    private static final int DEFAULT_ELEMENTS_PER_PAGE = 8;

    private static final String LAST_CHANCE = "last-chance";

    private static final String EXPIRATION_DATE_TIME = "expirationDateTime";

    private static final String CREATION_DATE_TIME = "creationDateTime";

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultProductService.class);

    public DefaultProductRepository(ProductJPARepository productJPARepository) {
        this.productJPARepository = productJPARepository;
    }

    @Override
    public List<ProductEntity> getAllProducts() throws Exception {
        return productJPARepository.findAll();
    }

    @Override
    public ProductEntity addProduct(CreateProductRequest createProductRequest) {
        ProductEntity productEntity = new ProductEntity(createProductRequest.getName(),
                createProductRequest.getDescription(), createProductRequest.getImageURL(),
                createProductRequest.getPrice(), createProductRequest.getExpirationDateTime(),
                createProductRequest.getUserId());

        LOGGER.info("Successfully added product={} to the database.", productEntity);
        return productJPARepository.save(productEntity);
    }

    @Override
    public ProductEntity getSingleProduct(UUID id) {
        LOGGER.info("Fetched product from the database with the id={} ", id);
        return productJPARepository.findById(id).get();
    }

    @Override
    public ProductEntity updateProduct(UUID id, ProductEntity product) {
        ProductEntity productForUpdate = productJPARepository.findById(id).get();

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.map(product, productForUpdate);

        LOGGER.info("Product with the id={} has been updated.", id);
        return productJPARepository.save(productForUpdate);
    }

    @Override
    public void deleteProduct(UUID id) {
        LOGGER.info("Successfully deleted product with the id={}", id);
        productJPARepository.deleteById(id);
    }

    @Override
    public ProductEntity getRandomProduct() {
        LOGGER.info("Fetched random product from the database.");
        return productJPARepository.getRandomProduct();
    }

    @Override
    public Page<ProductEntity> getProductsByCriteria(String criteria) {
        final Pageable page = PageRequest.of(0, DEFAULT_ELEMENTS_PER_PAGE, criteria.equalsIgnoreCase(LAST_CHANCE) ?
                Sort.by(EXPIRATION_DATE_TIME).ascending() :
                Sort.by(CREATION_DATE_TIME).descending());

        LOGGER.info("Fetched page of 8 products from the database, based on criteria={} ", criteria);
        return productJPARepository.findAll(page);
    }
}
