package com.internship.auctionapp.repositories.notification;

import com.internship.auctionapp.entities.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface NotificationJPARepository extends JpaRepository<NotificationEntity, UUID> {
    //DISTINCT ON is used, because one user is able to have 50 bids, and if we return without distinct, we will create
    // 50 new notifications for him just to say that he is outbidded
    @Query(value = "SELECT DISTINCT ON(n.user_id) " +
            "n.id, n.creation_date_time, n.notification_message, n.user_id, n.product_id " +
            "FROM notification n " +
            "WHERE n.product_id = :productId AND n.user_id != :userId ",
            nativeQuery = true
    )
    List<NotificationEntity> getNotificationEntityByUserIdAndProductId(@Param("productId") UUID productId,
                                                                       @Param("userId") UUID userId);
}
