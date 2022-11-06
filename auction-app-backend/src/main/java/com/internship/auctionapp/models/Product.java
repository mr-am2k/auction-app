package com.internship.auctionapp.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "Id", updatable = false, nullable = false)
    private UUID id;

    @Column(nullable = false)
    @NotBlank(message = "Product Name is required")
    private String name;

    @Column(nullable = false)
    @NotBlank(message = "Product Description is required")
    private String description;

    @Column(nullable = false)
    @NotBlank(message = "Product ImageURL is required")
    private String imageURL;

    @Column(nullable = false)
    @NotBlank(message = "Product Creation Date is required")
    private LocalDate creationDate;

    @Column(nullable = false)
    @NotBlank(message = "Product Expiration Date is required")
    private LocalDate expirationDate;

    @Column(nullable = false)
    @NotBlank(message = "Product Status is required")
    private String status;

    @Column(nullable = false)
    @NotBlank(message = "Product Size is required")
    private String size;
}
