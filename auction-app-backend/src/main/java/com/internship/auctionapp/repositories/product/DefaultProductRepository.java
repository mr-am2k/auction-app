package com.internship.auctionapp.repositories.product;

import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.repositories.user.UserJpaRepository;
import com.internship.auctionapp.requests.CreateProductRequest;

import org.modelmapper.ModelMapper;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Repository;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class DefaultProductRepository implements ProductRepository {
    private final ProductJpaRepository productJpaRepository;

    private final UserJpaRepository userJpaRepository;

    public DefaultProductRepository(ProductJpaRepository productJpaRepository, UserJpaRepository userJpaRepository) {
        this.productJpaRepository = productJpaRepository;
        this.userJpaRepository = userJpaRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return productJpaRepository.findAll().stream()
                .map(product -> product.toDomainModel())
                .collect(Collectors.toList());
    }

    @Override
    public Product addProduct(CreateProductRequest createProductRequest) {
        ProductEntity productEntity = new ProductEntity();

        productEntity.setName(createProductRequest.getName());
        productEntity.setDescription(createProductRequest.getDescription());
        productEntity.setImageURLs(createProductRequest.getImageURLs());
        productEntity.setStartPrice(createProductRequest.getStartPrice());
        productEntity.setExpirationDateTime(createProductRequest.getExpirationDateTime().atZone(ZoneOffset.UTC));

        final UserEntity user = userJpaRepository.findById(createProductRequest.getUserId()).get();

        productEntity.setUser(user);

        return productJpaRepository
                .save(productEntity)
                .toDomainModel();
    }

    @Override
    public Product getSingleProduct(UUID id) {
        return productJpaRepository.findById(id).get().toDomainModel();
    }

    @Override
    public Product updateProduct(UUID id, ProductEntity product) {
        final ProductEntity productForUpdate = productJpaRepository.findById(id).get();

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.map(product, productForUpdate);

        return productJpaRepository.save(productForUpdate).toDomainModel();
    }

    @Override
    public void deleteProduct(UUID id) {
        productJpaRepository.deleteById(id);
    }

    @Override
    public Product getRandomProduct() {
        return productJpaRepository.getRandomProduct().toDomainModel();
    }

    @Override
    public Page<Product> getProductsByCriteria(Pageable page) {
        return productJpaRepository.findAll(page).map(productEntity -> productEntity.toDomainModel());
    }

    @Override
    public List<Product> getProductsBetweenTwoDates(ZonedDateTime startDate, ZonedDateTime endDate) {
        return productJpaRepository.findAllByExpirationDateTimeBetween(startDate, endDate).stream()
                .map(productEntity -> productEntity.toDomainModel())
                .collect(Collectors.toList());
    }
}
