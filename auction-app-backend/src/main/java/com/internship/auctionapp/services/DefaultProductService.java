package com.internship.auctionapp.services;

import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.repositories.ProductRepository;
import org.hibernate.procedure.NoSuchParameterException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class DefaultProductService implements ProductService {
    private final ProductRepository productRepository;

    public DefaultProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product addProduct(Product product) {
        if (product.getExpirationDate().isBefore(product.getCreationDate())) {
            throw new IllegalArgumentException("Expiration date has to be after creation date");
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
    public List<Product> getProductsByCriteria(String oldOrNew) {
        if (oldOrNew.equalsIgnoreCase("last-chance")) {
            Pageable lastChanceOrderingOfEightElements = PageRequest.of(0, 8, Sort.by("expirationDate").ascending());
            List<Product> products = productRepository.findAll(lastChanceOrderingOfEightElements).getContent();
            return products;
        }
        if (oldOrNew.equalsIgnoreCase("new-arrival")) {
            Pageable newArrivalsOrderingOfEightElements = PageRequest.of(0, 8, Sort.by("creationDate").descending());
            List<Product> products = productRepository.findAll(newArrivalsOrderingOfEightElements).getContent();
            return products;
        }
        throw new NoSuchParameterException("You entered wrong query parameter: " + oldOrNew);
    }
}
