package com.internship.auctionapp.entities;

import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.models.Product;
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
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "products")
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
    @Column(name = "image_urls", nullable = false)
    private List<String> imageURLs;

    @Column(name = "start_price", nullable = false)
    @DecimalMin("0.5")
    private Double startPrice;

    @Column(name = "creation_date_time", nullable = false, columnDefinition = "timestamp with time zone")
    private ZonedDateTime creationDateTime = ZonedDateTime.now(ZoneOffset.UTC);

    @Column(name = "expiration_date_time", nullable = false, columnDefinition = "timestamp with time zone")
    private ZonedDateTime expirationDateTime;

    @OneToMany(
            mappedBy = "product",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            orphanRemoval = true
    )
    private List<BidEntity> bidEntities;

    // TODO: this will be updated in the future to the user entity when we create it
    @Column(name = "user_id", nullable = false)
    private UUID userId;

    public ProductEntity(String name, String description, List<String> imageURLs, Double startPrice,
                         ZonedDateTime expirationDateTime, UUID userId) {
        this.name = name;
        this.description = description;
        this.imageURLs = imageURLs;
        this.startPrice = startPrice;
        this.expirationDateTime = expirationDateTime;
        this.userId = userId;
    }

    public ProductEntity(
            String name,
            String description,
            List<String> imageURLs,
            Double startPrice,
            ZonedDateTime creationDateTime,
            ZonedDateTime expirationDateTime,
            UUID userId
    ) {
        this.name = name;
        this.description = description;
        this.imageURLs = imageURLs;
        this.startPrice = startPrice;
        this.creationDateTime = creationDateTime;
        this.expirationDateTime = expirationDateTime;
        this.userId = userId;
    }

    public Product toDomainModel() {
        List<Bid> bids = this.bidEntities != null ?
                this.bidEntities.stream()
                        .map(bidEntity -> bidEntity.toDomainModel()).collect(Collectors.toList()) : new ArrayList<>();

        ProductEntity productEntity = new ProductEntity(
                this.name,
                this.description,
                this.imageURLs,
                this.startPrice,
                this.creationDateTime,
                this.expirationDateTime,
                this.userId
        );

        Product product = new Product(
                this.id,
                productEntity,
                bids,
                DateUtils.calculateDateDiffVerbose(this.expirationDateTime)
        );

        return product;
    }
}
