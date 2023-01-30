package com.internship.auctionapp.entities;

import com.internship.auctionapp.models.Address;
import com.internship.auctionapp.models.Bid;
import com.internship.auctionapp.models.Product;
import com.internship.auctionapp.util.DateUtils;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
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
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEntity category;

    @ManyToOne
    @JoinColumn(name = "subcategory_id", nullable = false)
    private CategoryEntity subcategory;

    @Embedded
    private Address address;

    @ManyToOne
    @JoinColumn(name = "credit_card_id", nullable = false)
    private CreditCardEntity creditCard;

    @Formula("EXISTS (SELECT * FROM payments p WHERE p.related_entity_id = id AND p.payment_related_entity = 'PRODUCT')")
    private boolean paid;

    public ProductEntity(String name, String description, List<String> imageURLs, Double startPrice,
                         ZonedDateTime creationDateTime, ZonedDateTime expirationDateTime,
                         UserEntity user, CategoryEntity category, CategoryEntity subcategory, Address address,
                         CreditCardEntity creditCard) {
        this.name = name;
        this.description = description;
        this.imageURLs = imageURLs;
        this.startPrice = startPrice;
        this.creationDateTime = creationDateTime;
        this.expirationDateTime = expirationDateTime;
        this.user = user;
        this.category = category;
        this.subcategory = subcategory;
        this.address = address;
        this.creditCard = creditCard;
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
            CategoryEntity subcategory,
            Address address,
            CreditCardEntity creditCard,
            UUID highestBidder,
            Double highestBidPrice,
            boolean paid
    ) {
        this.name = name;
        this.description = description;
        this.imageURLs = imageURLs;
        this.startPrice = startPrice;
        this.creationDateTime = creationDateTime;
        this.expirationDateTime = expirationDateTime;
        this.user = user;
        this.category = category;
        this.subcategory = subcategory;
        this.address = address;
        this.creditCard = creditCard;
        this.highestBidder = highestBidder;
        this.highestBidPrice = highestBidPrice;
        this.paid = paid;
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
                this.subcategory,
                this.address,
                this.creditCard,
                this.highestBidder,
                this.highestBidPrice,
                this.paid
        );

        return new Product(
                this.id,
                productEntity,
                bids,
                DateUtils.calculateDateDiffVerbose(this.expirationDateTime)
        );
    }
}
