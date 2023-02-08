package com.internship.auctionapp.util;

public enum AuthenticationProvider {
    AUCTION_APP("AUCTION_APP"),
    GOOGLE("GOOGLE"),
    FACEBOOK("FACEBOOK");

    private String value;

    AuthenticationProvider(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
