package com.internship.auctionapp.util.sse;

import com.internship.auctionapp.requests.BidChangedProductRequest;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.UUID;


public interface EventsEmitterService {
    void addEmitter(SseEmitter sseEmitter);
    void sendChangedProduct(BidChangedProductRequest bidChangedProductRequest, UUID productId);
}
