package com.internship.auctionapp.util;

import javax.servlet.http.HttpServletRequest;

public class RequestUtils {
    public static String getAccessToken(HttpServletRequest request){
        final String AUTHORIZATION_HEADER = "Authorization";
        final String BEARER = "Bearer";

        final String requestTokenHeader = request.getHeader(AUTHORIZATION_HEADER);

        String token = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith(BEARER)) {
            token = requestTokenHeader.substring(BEARER.length());
        }

        return token;
    }

    public static String getRefreshToken(HttpServletRequest request){
        final String AUTHORIZATION_HEADER_REFRESH = "AuthorizationRefresh";
        final String REFRESH = "Refresh";

        final String requestTokenHeader = request.getHeader(AUTHORIZATION_HEADER_REFRESH);

        String token = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith(REFRESH)) {
            token = requestTokenHeader.substring(REFRESH.length());
        }

        return token;
    }
}
