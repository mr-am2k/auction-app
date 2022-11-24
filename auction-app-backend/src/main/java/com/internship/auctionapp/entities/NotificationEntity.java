package com.internship.auctionapp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.internship.auctionapp.models.Notification;
import com.internship.auctionapp.util.NotificationType;
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
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
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

    @Column(name = "creation_date_time", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private ZonedDateTime creationDateTime = ZonedDateTime.of(LocalDateTime.now(), ZoneOffset.UTC);

    @Column(name = "message", nullable = false)
    private NotificationType notificationType;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private ProductEntity product;

    public NotificationEntity(
            NotificationType notificationType,
            UUID userId,
            ProductEntity product
    ) {
        this.notificationType = notificationType;
        this.userId = userId;
        this.product = product;
    }

    public Notification toDomainModel() {
        NotificationEntity notificationEntity = new NotificationEntity(
          this.id,
          this.creationDateTime,
          this.notificationType,
          this.userId,
          this.product
        );

        return new Notification(notificationEntity);
    }
}

