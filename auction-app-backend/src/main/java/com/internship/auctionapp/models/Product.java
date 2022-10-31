package com.internship.auctionapp.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
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

    @NotBlank(message = "Product Name is required")
    private String name;

    @NotBlank(message = "Product Description is required")
    private String description;

    @NotBlank(message = "Product ImageURL is required")
    private String imageURL;

    @NotBlank(message = "Product Creation Date is required")
    private LocalDate creationDate;

    @NotBlank(message = "Product Expiration Date is required")
    private LocalDate expirationDate;

    @NotBlank(message = "Product Status is required")
    private String status;

    @NotBlank(message = "Product Size is required")
    private String size;
}
