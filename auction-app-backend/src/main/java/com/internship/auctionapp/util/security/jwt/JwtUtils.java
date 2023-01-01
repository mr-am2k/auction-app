package com.internship.auctionapp.util.security.jwt;

import com.internship.auctionapp.services.blacklistedToken.AuthTokenService;
import com.internship.auctionapp.util.security.services.DefaultUserDetails;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${app.jwt_secret}")
    private String accessTokenSecret;

    @Value("${app.jwt_expiration_ms}")
    private Integer accessTokenExpiration;

    @Value("${app.jwt_refresh_secret}")
    private String refreshTokenSecret;

    @Value("${app.jwt_refresh_expiration_ms}")
    private Integer refreshTokenExpiration;

    private final AuthTokenService authTokenService;

    public JwtUtils(AuthTokenService authTokenService) {
        this.authTokenService = authTokenService;
    }

    public String generateJwtAccessToken(String username) {
        return generateJwtTokenFromUsername(username, accessTokenExpiration, accessTokenSecret);
    }

    public String generateJwtRefreshToken(String username) {
        return generateJwtTokenFromUsername(username, refreshTokenExpiration, refreshTokenSecret);
    }

    public String generateJwtTokenFromUsername(String username, Integer expiration, String secret) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + expiration))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public String getEmailFromJwtToken(String token, boolean accessToken) {
        if(accessToken){
            return Jwts.parser().setSigningKey(accessTokenSecret).parseClaimsJws(token).getBody().getSubject();
        }

        return Jwts.parser().setSigningKey(refreshTokenSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public void blacklistToken(String token) {
        authTokenService.addToken(token, true);
    }

    public LocalDateTime getTokenExpirationTime(String token) {
        Date expirationDate = Jwts.parser().setSigningKey(accessTokenSecret).parseClaimsJws(token).getBody().getExpiration();

        return LocalDateTime.ofInstant(expirationDate.toInstant(), ZoneId.systemDefault());
    }

    public boolean validateJwtToken(String authToken) {
        if (authTokenService.checkIfBlacklisted(authToken)) {
            return false;
        }

        try {
            Jwts.parser().setSigningKey(accessTokenSecret).parseClaimsJws(authToken).getBody();

            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }
}
