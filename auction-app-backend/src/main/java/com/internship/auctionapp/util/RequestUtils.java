package com.internship.auctionapp.util;

import javax.servlet.http.HttpServletRequest;

public class RequestUtils {
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER = "Bearer";

    public static final String AUTHORIZATION_HEADER_REFRESH = "AuthorizationRefresh";
    public static final String REFRESH = "Refresh";

    public static String getToken(HttpServletRequest request, String tokenType) {
        final String requestTokenHeader = switch (tokenType) {
            case BEARER -> request.getHeader(AUTHORIZATION_HEADER);
            case REFRESH -> request.getHeader(AUTHORIZATION_HEADER_REFRESH);
            default -> "";
        };


        String token = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith(tokenType)) {
            token = requestTokenHeader.substring(tokenType.length());
        }

        return token;
    }
}
