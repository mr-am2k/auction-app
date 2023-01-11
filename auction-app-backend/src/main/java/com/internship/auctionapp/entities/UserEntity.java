package com.internship.auctionapp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.internship.auctionapp.models.Address;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.util.UserRole;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password_hash", nullable = false)
    @JsonIgnore
    private String passwordHash;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "role", nullable = false)
    private UserRole role = UserRole.ROLE_USER;

    @Column(name = "active", nullable = false)
    private boolean active = true;

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Embedded
    private Address address;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "credit_card_id", referencedColumnName = "id")
    private CreditCardEntity creditCard;

    public User toDomainModel() {
        User user = new User();

        user.setId(this.id);
        user.setFirstName(this.firstName);
        user.setLastName(this.lastName);
        user.setEmail(this.email);
        user.setPhoneNumber(this.phoneNumber);
        user.setProfileImageUrl(this.profileImageUrl);
        user.setDateOfBirth(this.dateOfBirth);
        user.setAddress(this.address);
        user.setCard(this.creditCard != null ? this.creditCard.toDomainModel() : null);

        return user;
    }
}
