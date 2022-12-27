package com.internship.auctionapp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.internship.auctionapp.models.Card;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
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
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "cards")
public class CardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "holder_name", nullable = false)
    private String holderName;

    @Column(name = "number", nullable = false)
    private String number;

    @Column(name = "expiration_date", nullable = false)
    private Date expirationDate;

    @Column(name = "verification_value", nullable = false)
    private String verificationValue;

    public Card toDomainModel(){
        Card card = new Card();

        card.setId(this.id);
        card.setHolderName(this.holderName);
        card.setNumber(this.number);
        card.setExpirationDate(this.expirationDate);
        card.setVerificationValue(this.verificationValue);

        return card;
    }
}

