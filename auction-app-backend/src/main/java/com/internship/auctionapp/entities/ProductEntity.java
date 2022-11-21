package com.internship.auctionapp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.internship.auctionapp.domainmodels.Bid;
import com.internship.auctionapp.domainmodels.Product;
import com.internship.auctionapp.util.DateUtils;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.DecimalMin;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Product")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false, columnDefinition = "varchar(1000)")
    private String description;

    @ElementCollection
    @Column(name = "imageURL", nullable = false)
    private List<String> imageURL;

    @Column(name = "price", nullable = false)
    @DecimalMin("0.5")
    private Double price;

    @Column(name = "creationDateTime", nullable = false)
    private LocalDateTime creationDateTime;

    @Column(name = "expirationDateTime", nullable = false)
    private LocalDateTime expirationDateTime;

    @OneToMany(
            mappedBy = "product",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            orphanRemoval = true
    )
    private List<BidEntity> bidEntities;

    //this will be updated in the future to the user entity when we create it
    @Column(name = "user_id", nullable = false)
    private UUID userId;

    public ProductEntity(String name, String description, List<String> imageURL, Double price,
                         LocalDateTime expirationDateTime, UUID userId) {
        this.name = name;
        this.description = description;
        this.imageURL = imageURL;
        this.price = price;
        this.creationDateTime = LocalDateTime.now();
        this.expirationDateTime = expirationDateTime;
        this.userId = userId;
    }

    public Product toDomainModel() {
        List<Bid> bidEntities = this.bidEntities != null ?
                this.bidEntities.stream()
                        .map(bidEntity -> bidEntity.toDomainModel()).collect(Collectors.toList()) : new ArrayList<>();
        Product newProduct = new Product(this.id, this.name, this.description, this.imageURL, this.price,
                this.creationDateTime, this.expirationDateTime, bidEntities,
                DateUtils.calculateDateDiffVerbose(this.expirationDateTime), this.userId
        );

        return newProduct;
    }
}
