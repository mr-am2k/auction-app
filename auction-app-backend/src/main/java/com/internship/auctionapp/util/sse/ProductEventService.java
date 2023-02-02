package com.internship.auctionapp.util.sse;

import com.internship.auctionapp.requests.ProductEventRequest;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.UUID;

public interface ProductEventService {
    void addEmitter(SseEmitter sseEmitter);
    void sendChangedProduct(ProductEventRequest productEventRequest, UUID productId);
}
