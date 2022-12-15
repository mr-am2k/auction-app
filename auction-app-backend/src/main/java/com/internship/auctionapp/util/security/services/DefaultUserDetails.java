package com.internship.auctionapp.util.security.services;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.internship.auctionapp.entities.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DefaultUserDetails implements UserDetails {
    private UUID id;

    private String email;

    @JsonIgnore
    private String password;

    private String fullName;

    private Collection<? extends GrantedAuthority> authorities;

    public static DefaultUserDetails build(UserEntity user) {
        final List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole().getValue()));

        final String fullName = user.getFirstName() + " " + user.getLastName();

        return new DefaultUserDetails(
                user.getId(),
                user.getEmail(),
                user.getPasswordHash(),
                fullName,
                authorities
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getUsername() {
        return email;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DefaultUserDetails that = (DefaultUserDetails) o;

        return Objects.equals(id, that.id) && Objects.equals(email, that.email);
    }
}
