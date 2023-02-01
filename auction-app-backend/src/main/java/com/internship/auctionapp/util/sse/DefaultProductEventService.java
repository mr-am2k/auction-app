package com.internship.auctionapp.util.sse;

import com.internship.auctionapp.requests.ProductEventRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class DefaultProductEventService extends DefaultEventsEmitterService implements ProductEventService{
    @Override
    public void sendChangedProduct(ProductEventRequest productEventRequest, UUID productId) {
        final List<SseEmitter> finishedEmitters = new ArrayList<>();

        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter
                        .event()
                        .name(productId.toString())
                        .data(productEventRequest)
                );
            } catch (IOException e) {
                finishedEmitters.add(emitter);
            }
        });

        emitters.removeAll(finishedEmitters);
    }
}
