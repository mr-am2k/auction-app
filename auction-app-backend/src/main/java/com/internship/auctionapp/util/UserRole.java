package com.internship.auctionapp.util;

public enum UserRole {
    ROLE_USER("ROLE_USER"),
    ROLE_ADMIN("ROLE_ADMIN");

    private String role;

    UserRole(String role_user) {
        this.role = role_user;
    }

    public String getRoleToString() {
        return role;
    }
}
