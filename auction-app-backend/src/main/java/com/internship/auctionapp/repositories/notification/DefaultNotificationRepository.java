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
    @Transactional
    public Notification createNotification(CreateNotificationRequest createNotificationRequest) {
        final ProductEntity product = productJPARepository.findById(createNotificationRequest.getProductId()).get();
        NotificationEntity notification = new NotificationEntity(
                createNotificationRequest.getNotificationMessage(),
                createNotificationRequest.getUserId(), product
        );

        notificationJPARepository.save(notification);

        if (notification.getNotificationMessage() == NotificationMessage.HIGHEST_BID_PLACED) {
            getNotificationsByProductIdForAllUsersExcept(createNotificationRequest.getUserId(), product.getId()).stream()
                    .forEach((n) -> {
                        final List<Notification> latestNotificationForUser = notificationJPARepository.
                                getNotificationForUserOrderedByDate(
                                        n.getUserId(),
                                        createNotificationRequest.getProductId()
                                ).stream()
                                .map(notificationEntity -> notificationEntity.toDomainModel())
                                .collect(Collectors.toList());

                        if (latestNotificationForUser.get(0).getNotificationMessage().equals(NotificationMessage.HIGHEST_BID_PLACED.toString())) {

                            NotificationEntity outbiddedNotification = (new NotificationEntity(NotificationMessage.OUTBIDDED,
                                    n.getUserId(), n.getProduct()));
                            notificationJPARepository.save(outbiddedNotification);
                        }
                    });
        }

        return notification.toDomainModel();
    }

    @Override
    public Notification getNotificationForUserOrderedByDate(UUID userId, UUID productId) {
        return notificationJPARepository.getNotificationForUserOrderedByDate(userId, productId).get(0).toDomainModel();
    }

    private List<NotificationEntity> getNotificationsByProductIdForAllUsersExcept(UUID userId, UUID productId) {
        return notificationJPARepository.getNotificationsByProductIdForAllUsersExcept(userId, productId);
    }
}
