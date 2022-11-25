package com.internship.auctionapp.repositories.notification;

import com.internship.auctionapp.entities.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface NotificationJPARepository extends JpaRepository<NotificationEntity, UUID> {
    List<NotificationEntity> findDistinctByUserIdNotAndProductId(
            @Param("userId") UUID userId,
            @Param("productId") UUID productId
    );

    NotificationEntity findTopByUserIdAndProductIdOrderByCreationDateTimeDesc(
            @Param("userId") UUID userId,
            @Param("productId") UUID productId
    );
}
