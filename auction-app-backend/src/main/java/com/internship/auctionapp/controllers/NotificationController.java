package com.internship.auctionapp.controllers;

import com.internship.auctionapp.domainmodels.Notification;
import com.internship.auctionapp.requests.CreateNotificationRequest;
import com.internship.auctionapp.services.NotificationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/notifications")
@CrossOrigin
@Tag(name = "Notifications")
public class NotificationController {
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping()
    public List<Notification> getAllNotifications(){
        return notificationService.getAllNotifications();
    }

    @PostMapping()
    public Notification addNotification(@RequestBody CreateNotificationRequest createNotificationRequest) throws Exception {
        return notificationService.addNotification(createNotificationRequest);
    }
}
