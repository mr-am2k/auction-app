package com.internship.auctionapp.entities;

import com.internship.auctionapp.models.Payment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "payments")
public class PaymentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "amount", nullable = false)
    private Integer amount;

    @Column(name = "payment_time")
    private LocalDateTime paymentTime = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "credit_card_id", nullable = false)
    private CreditCardEntity creditCard;

    public Payment toDomainModel() {
        Payment payment = new Payment();

        payment.setId(this.id);
        payment.setAmount(this.amount);
        payment.setPaymentTime(this.paymentTime);
        payment.setProduct(this.product);
        payment.setUser(this.user);
        payment.setCreditCard(this.creditCard);

        return payment;
    }
}
