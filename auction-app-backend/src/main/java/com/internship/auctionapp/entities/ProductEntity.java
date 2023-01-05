package com.internship.auctionapp.entities;

import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.models.Category;
import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.models.ProductWithoutBid;
import com.internship.auctionapp.util.DateUtils;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
    private ZonedDateTime creationDateTime;

    @Column(name = "expiration_date_time", nullable = false, columnDefinition = "timestamp with time zone")
    private ZonedDateTime expirationDateTime;

    @Formula("(SELECT b.user_id FROM bids b " +
            "INNER JOIN products p on p.id = b.product_id " +
            "WHERE id = b.product_id ORDER BY b.price DESC LIMIT 1)")
    private UUID highestBidder;

    @Formula("(SELECT b.price FROM bids b " +
            "INNER JOIN products p on p.id = b.product_id " +
            "WHERE id = b.product_id ORDER BY b.price DESC LIMIT 1)")
    private Double highestBidPrice;

    @OneToMany(
            mappedBy = "product",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            orphanRemoval = true
    )
    private List<BidEntity> bidEntities;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "categoryId", nullable = false)
    private CategoryEntity category;

    public ProductEntity(String name, String description, List<String> imageURLs, Double startPrice,
                         ZonedDateTime creationDateTime, ZonedDateTime expirationDateTime,
                         UserEntity user, CategoryEntity category) {
        this.name = name;
        this.description = description;
        this.imageURLs = imageURLs;
        this.startPrice = startPrice;
        this.creationDateTime = creationDateTime;
        this.expirationDateTime = expirationDateTime;
        this.user = user;
        this.category = category;
    }

    public ProductEntity(
            String name,
            String description,
            List<String> imageURLs,
            Double startPrice,
            ZonedDateTime creationDateTime,
            ZonedDateTime expirationDateTime,
            UserEntity user,
            CategoryEntity category,
            UUID highestBidder,
            Double highestBidPrice
    ) {
        this.name = name;
        this.description = description;
        this.imageURLs = imageURLs;
        this.startPrice = startPrice;
        this.creationDateTime = creationDateTime;
        this.expirationDateTime = expirationDateTime;
        this.user = user;
        this.category = category;
        this.highestBidder = highestBidder;
        this.highestBidPrice = highestBidPrice;
    }

    public Product toDomainModel() {
        List<Bid> bids = this.bidEntities != null ?
                this.bidEntities.stream()
                        .map(BidEntity::toDomainModel).collect(Collectors.toList()) : new ArrayList<>();

        ProductEntity productEntity = new ProductEntity(
                this.name,
                this.description,
                this.imageURLs,
                this.startPrice,
                this.creationDateTime,
                this.expirationDateTime,
                this.user,
                this.category,
                this.highestBidder,
                this.highestBidPrice
        );

        return new Product(
                this.id,
                productEntity,
                bids,
                DateUtils.calculateDateDiffVerbose(this.expirationDateTime)
        );
    }

    public ProductWithoutBid toDomainModelWithoutBids() {
        ProductWithoutBid productWithoutBid = new ProductWithoutBid();

        final String remainingTime = DateUtils.calculateDateDiffVerbose(this.expirationDateTime);

        productWithoutBid.setId(this.id);
        productWithoutBid.setName(this.name);
        productWithoutBid.setDescription(this.description);
        productWithoutBid.setImageURLs(this.imageURLs);
        productWithoutBid.setStartPrice(this.startPrice);
        productWithoutBid.setCreationDateTime(this.creationDateTime);
        productWithoutBid.setExpirationDateTime(this.expirationDateTime);
        productWithoutBid.setRemainingTime(remainingTime);
        productWithoutBid.setNumberOfBids(this.bidEntities.size());
        productWithoutBid.setUser(this.user.toDomainModel());
        productWithoutBid.setCategory(this.category.toDomainModel());
        productWithoutBid.setHighestBidder(this.highestBidder);
        productWithoutBid.setHighestBidPrice(this.highestBidPrice);

        return productWithoutBid;
    }
}
