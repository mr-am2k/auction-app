package com.internship.auctionapp.entities;

import com.internship.auctionapp.models.CreditCard;
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
import java.util.Date;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "cards")
public class CreditCardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "holder_full_name")
    private String holderFullName;

    @Column(name = "number")
    private String number;

    @Column(name = "expiration_date")
    private Date expirationDate;

    @Column(name = "verification_value")
    private String verificationValue;

    public CreditCard toDomainModel(){
        CreditCard creditCard = new CreditCard();

        creditCard.setId(this.id);
        creditCard.setHolderFullName(this.holderFullName);
        creditCard.setNumber(this.number);
        creditCard.setExpirationDate(this.expirationDate);
        creditCard.setVerificationValue(this.verificationValue);

        return creditCard;
    }
}

