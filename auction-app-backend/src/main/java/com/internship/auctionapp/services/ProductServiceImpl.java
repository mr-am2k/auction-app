package com.internship.auctionapp.services;

import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.repositories.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product getSingleProduct(UUID id) {
        return productRepository.findById(id).get();
    }

    @Override
    public Product updateProduct(UUID id, Product product)  {
        Product productForUpdate = productRepository.findById(id).get();
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.map(product, productForUpdate);
        return productRepository.save(productForUpdate);
    }

    @Override
    public void deleteProduct(UUID id) {
        productRepository.deleteById(id);
    }
}
