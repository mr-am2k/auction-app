package com.internship.auctionapp.repositories.notification;

import com.internship.auctionapp.entities.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface NotificationJPARepository extends JpaRepository<NotificationEntity, UUID> {
    @Query(value = "SELECT DISTINCT ON(n.user_id) " +
            "n.id, n.creation_date_time, n.message, n.user_id, n.product_id " +
            "FROM notifications n " +
            "WHERE n.product_id = :productId AND n.user_id != :userId",
            nativeQuery = true
    )
    List<NotificationEntity> getNotificationEntityByUserIdAndProductId(@Param("productId") UUID productId,
                                                                       @Param("userId") UUID userId);

    @Query(
            value = "SELECT * FROM notifications n " +
                    "WHERE  n.user_id = :userId AND n.product_id = :productId " +
                    "ORDER BY n.creation_date_time DESC " +
                    "LIMIT 1",
            nativeQuery = true
    )
    NotificationEntity getNotificationForUserOrderedByDate(@Param("userId") UUID userId,
                                                            @Param("productId") UUID productId);
}
