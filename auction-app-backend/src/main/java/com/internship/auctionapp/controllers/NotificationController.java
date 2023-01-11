package com.internship.auctionapp.controllers;

import com.internship.auctionapp.models.Notification;
import com.internship.auctionapp.requests.CreateNotificationRequest;
import com.internship.auctionapp.services.notification.NotificationService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

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
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @PostMapping()
    @SecurityRequirement(name = "Bearer Authentication")
    public Notification createNotification(@RequestBody CreateNotificationRequest createNotificationRequest) {
        return notificationService.createNotification(createNotificationRequest);
    }

    @GetMapping("/search")
    public Notification getNotifications(@RequestParam UUID userId, @RequestParam UUID productId) {
        return notificationService.getNotifications(userId, productId);
    }

}
