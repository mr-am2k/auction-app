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

    @NotBlank(message = "Please provide Product Name")
    private String name;

    @NotBlank(message = "Please provide Product Description")
    private String description;

    @NotBlank(message = "Please provide Product ImageURL")
    private String imageURL;

    @NotBlank(message = "Please provide Product Creation Date")
    private LocalDate creationDate;

    @NotBlank(message = "Please provide Expiration Date")
    private LocalDate expirationDate;

    @NotBlank(message = "Please provide Status")
    private String status;

    @NotBlank(message = "Please provide Size")
    private String size;
}
