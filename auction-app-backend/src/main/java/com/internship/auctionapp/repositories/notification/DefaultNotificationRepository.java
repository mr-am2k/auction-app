package com.internship.auctionapp.repositories.notification;

import com.internship.auctionapp.models.Notification;
import com.internship.auctionapp.entities.NotificationEntity;
import com.internship.auctionapp.entities.ProductEntity;
import com.internship.auctionapp.repositories.product.ProductJPARepository;
import com.internship.auctionapp.requests.CreateNotificationRequest;
import com.internship.auctionapp.services.DefaultProductService;
import com.internship.auctionapp.util.NotificationMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class DefaultNotificationRepository implements NotificationRepository {
    private final NotificationJPARepository notificationJPARepository;

    private final ProductJPARepository productJPARepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultProductService.class);

    public DefaultNotificationRepository(
            NotificationJPARepository notificationJPARepository,
            ProductJPARepository productJPARepository
    ) {
        this.notificationJPARepository = notificationJPARepository;
        this.productJPARepository = productJPARepository;
    }

    @Override
    public List<Notification> getAllNotifications() {
        return notificationJPARepository.findAll().stream()
                .map(notificationEntity -> notificationEntity.toDomainModel())
                .collect(Collectors.toList());
    }

    @Override
    public Notification createNotification(CreateNotificationRequest createNotificationRequest) {
        ProductEntity product = productJPARepository.findById(createNotificationRequest.getProductId()).get();
        NotificationEntity notification = new NotificationEntity(
                createNotificationRequest.getNotificationMessage(),
                createNotificationRequest.getUserId(),
                product
        );

        notificationJPARepository.save(notification).toDomainModel();

        if(notification.getNotificationMessage() == NotificationMessage.HIGHEST_BID_PLACED) {
            getNotificationsByProductIdForAllUsersExcept(createNotificationRequest.getUserId(), product.getId()).stream()
                    .forEach(notificationEntity -> {
                        List<Notification> latestNotificationForUser = notificationJPARepository.searchNotifications(
                                notificationEntity.getUserId(),
                                product.getId()
                        ).stream()
                                .map(n -> n.toDomainModel()).collect(Collectors.toList());

                        if(latestNotificationForUser.get(0).getNotificationMessage().equals(String.valueOf(NotificationMessage.HIGHEST_BID_PLACED))) {
                            NotificationEntity outBidded = new NotificationEntity(NotificationMessage.OUTBIDDED, notificationEntity.getUserId(), notificationEntity.getProduct());
                            notificationJPARepository.save(outBidded);
                        }
                    });
        }

        return notification.toDomainModel();
    }

    @Override
    public List<Notification> searchNotifications(UUID userId, UUID productId) {
        return notificationJPARepository.searchNotifications(userId, productId).stream()
                .map(notificationEntity -> notificationEntity.toDomainModel())
                .collect(Collectors.toList());
    }

    private List<NotificationEntity> getNotificationsByProductIdForAllUsersExcept(UUID userId, UUID productId) {
        return notificationJPARepository.getNotificationsByProductIdForAllUsersExcept(userId, productId);
    }
}
