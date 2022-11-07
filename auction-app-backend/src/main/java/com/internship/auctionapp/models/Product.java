package com.internship.auctionapp.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;
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
    @Column(name = "Id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "Description", nullable = false, columnDefinition="varchar(1000)")
    private String description;

    @Column(name = "ImageURL", nullable = false)
    private String imageURL;

    @Column(name = "Price", nullable = false)
    @DecimalMin("0.5")
    private Double price;

    @Column(name = "CreationDate", nullable = false)
    private LocalDate creationDate;

    @Column(name = "ExpirationDate", nullable = false)
    private LocalDate expirationDate;

    public Product(String name, String description, String imageURL, Double price, LocalDate creationDate, LocalDate expirationDate) {
        this.name = name;
        this.description = description;
        this.imageURL = imageURL;
        this.price = price;
        this.creationDate = creationDate;
        this.expirationDate = expirationDate;
    }
}
