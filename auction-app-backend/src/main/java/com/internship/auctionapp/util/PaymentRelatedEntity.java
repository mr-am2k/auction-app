package com.internship.auctionapp.util;

public enum PaymentRelatedEntity {
    PRODUCT("PRODUCT");

    private String value;

    PaymentRelatedEntity(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}