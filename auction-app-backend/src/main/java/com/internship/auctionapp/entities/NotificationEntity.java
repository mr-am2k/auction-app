package com.internship.auctionapp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.internship.auctionapp.domainmodels.Notification;
import com.internship.auctionapp.util.NotificationMessage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "notifications")
public class NotificationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "creation_date_time", nullable = false)
    private LocalDateTime creationDateTime = LocalDateTime.now();

    @Column(name = "message", nullable = false)
    private NotificationMessage notificationMessage;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private ProductEntity product;

    public NotificationEntity(
            NotificationMessage notificationMessage,
            UUID userId,
            ProductEntity product) {
        this.notificationMessage = notificationMessage;
        this.userId = userId;
        this.product = product;
    }

    public Notification toDomainModel() {
        return new Notification(this.getId(), this.getCreationDateTime(), this.getNotificationMessage().toString(),
                this.getUserId(), this.getProduct().getId());
    }
}

