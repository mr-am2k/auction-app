package com.internship.auctionapp.util;

public enum AuthenticationProvider {
    LOCAL("LOCAL"),
    GOOGLE("GOOGLE");
    private String value;

    AuthenticationProvider(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
