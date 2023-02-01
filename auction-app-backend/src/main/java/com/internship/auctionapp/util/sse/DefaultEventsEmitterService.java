package com.internship.auctionapp.util.sse;

import com.internship.auctionapp.requests.BidChangedProductRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class DefaultEventsEmitterService implements EventsEmitterService {
    final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    public void addEmitter(SseEmitter emitter) {
        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitters.add(emitter);
    }

    @Override
    public void sendChangedProduct(BidChangedProductRequest bidChangedProductRequest, UUID productId) {
        final List<SseEmitter> finishedEmitters = new ArrayList<>();

        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter
                        .event()
                        .name(productId.toString())
                        .data(bidChangedProductRequest)
                );
            } catch (IOException e) {
                finishedEmitters.add(emitter);
            }
        });

        emitters.removeAll(finishedEmitters);
    }
}
