package com.internship.auctionapp.services;

import com.internship.auctionapp.middleware.exception.ProductExpirationDateException;
import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.repositories.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DefaultProductService implements ProductService {
    private final ProductRepository productRepository;

    private static final int DEFAULT_ELEMENTS_PER_PAGE = 8;

    private static final String LAST_CHANCE = "last-chance";

    private static final String EXPIRATION_DATE_TIME = "expirationDateTime";

    private static final String CREATION_DATE_TIME = "creationDateTime";

    public DefaultProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product addProduct(Product product) {
        if (product.getExpirationDateTime().isBefore(product.getCreationDateTime())) {
            throw new ProductExpirationDateException();
        }
        return productRepository.save(product);
    }

    @Override
    public Product getSingleProduct(UUID id) {
        return productRepository.findById(id).get();
    }

    @Override
    public Product updateProduct(UUID id, Product product) {
        Product productForUpdate = productRepository.findById(id).get();
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.map(product, productForUpdate);
        return productRepository.save(productForUpdate);
    }

    @Override
    public void deleteProduct(UUID id) {
        productRepository.deleteById(id);
    }

    @Override
    public Product getRandomProduct() {
        return productRepository.getRandomProduct();
    }

    @Override
    public Page<Product> getProductsByCriteria(String criteria) {
        final Pageable page = PageRequest.of(0, DEFAULT_ELEMENTS_PER_PAGE, criteria.equalsIgnoreCase(LAST_CHANCE) ?
                Sort.by(EXPIRATION_DATE_TIME).ascending() :
                Sort.by(CREATION_DATE_TIME).descending());
        return productRepository.findAll(page);
    }
}
