package com.internship.auctionapp.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false, columnDefinition="varchar(1000)")
    private String description;

    @Column(name = "imageURL", nullable = false)
    private String imageURL;

    @Column(name = "price", nullable = false)
    @DecimalMin("0.5")
    private Double price;

    @Column(name = "creationDateTime", nullable = false)
    private LocalDateTime creationDateTime;

    @Column(name = "expirationDateTime", nullable = false)
    private LocalDateTime expirationDateTime;

    public Product(String name, String description, String imageURL, Double price, LocalDateTime creationDateTime, LocalDateTime expirationDateTime) {
        this.name = name;
        this.description = description;
        this.imageURL = imageURL;
        this.price = price;
        this.creationDateTime = creationDateTime;
        this.expirationDateTime = expirationDateTime;
    }
}
