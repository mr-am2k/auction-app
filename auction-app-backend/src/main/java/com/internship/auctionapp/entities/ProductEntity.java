package com.internship.auctionapp.entities;

import com.internship.auctionapp.domainmodels.Product;
import com.internship.auctionapp.util.DateDifference;
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
import java.util.List;
import java.util.UUID;

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

    public ProductEntity(String name, String description, List<String> imageURL, Double price, LocalDateTime creationDateTime, LocalDateTime expirationDateTime) {
        this.name = name;
        this.description = description;
        this.imageURL = imageURL;
        this.price = price;
        this.creationDateTime = creationDateTime;
        this.expirationDateTime = expirationDateTime;
    }

    public Product toDomainModel() {
        DateDifference dateDifference = new DateDifference();
        Product newProduct = new Product(this.id, this.name, this.description, this.imageURL, this.price,
                this.creationDateTime, this.expirationDateTime, this.bidEntities,
                dateDifference.calculateDateDiff(this.expirationDateTime));
        return newProduct;
    }
}
