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
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @NotBlank(message = "Please provide Product Name")
    private String Name;

    @NotBlank(message = "Please provide Product Description")
    private String Description;

    @NotBlank(message = "Please provide Product ImageURL")
    private String ImageURL;

    @NotBlank(message = "Please provide Product Creation Date")
    private LocalDate CreationDate;

    @NotBlank(message = "Please provide Expiration Date")
    private LocalDate ExpirationDate;

    @NotBlank(message = "Please provide Status")
    private String Status;

    @NotBlank(message = "Please provide Size")
    private String Size;

    @NotBlank(message = "Please provide Color")
    private String Color;

}
