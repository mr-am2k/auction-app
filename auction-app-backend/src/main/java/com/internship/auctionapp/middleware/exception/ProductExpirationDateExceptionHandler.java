package com.internship.auctionapp.middleware.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZonedDateTime;

@ControllerAdvice
public class ProductExpirationDateExceptionHandler {

    @ExceptionHandler(value = {ProductExpirationDateException.class})
    public ResponseEntity<Object> handleProductExpirationDateException(ProductExpirationDateException e){
        HttpStatus badRequest = HttpStatus.BAD_REQUEST;

        ApiException apiException = new ApiException(e.getMessage(), badRequest, ZonedDateTime.now());
        return new ResponseEntity<>(apiException, badRequest);
    }
}
