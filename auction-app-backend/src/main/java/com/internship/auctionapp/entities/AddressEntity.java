package com.internship.auctionapp.entities;

import com.internship.auctionapp.models.Address;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "addresses")
public class AddressEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "street")
    private String street;

    @Column(name = "city")
    private String city;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "state")
    private String state;

    @Column(name = "country")
    private String country;

    public Address toDomainModel() {
        Address address = new Address();

        address.setId(this.id);
        address.setStreet(this.street);
        address.setCity(this.city);
        address.setZipCode(this.zipCode);
        address.setState(this.state);
        address.setCountry(this.country);

        return address;
    }
}
