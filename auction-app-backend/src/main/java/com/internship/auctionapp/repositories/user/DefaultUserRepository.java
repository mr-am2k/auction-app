package com.internship.auctionapp.repositories.user;

import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.middleware.exception.UserNotFoundWithIdException;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.requests.UserRegisterRequest;
import com.internship.auctionapp.util.UserRole;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class DefaultUserRepository implements UserRepository {
    private final String ADMIN = "admin";

    private final UserJpaRepository userJpaRepository;

    public DefaultUserRepository(UserJpaRepository userJpaRepository) {
        this.userJpaRepository = userJpaRepository;
    }

    @Override
    public UserEntity findByEmail(String email) {
        return userJpaRepository.findByEmail(email);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userJpaRepository.existsByEmail(email);
    }

    @Override
    public UserEntity addUser(UserRegisterRequest userRegisterRequest) {
        final UserEntity user = new UserEntity(
                userRegisterRequest.getFirstName(),
                userRegisterRequest.getLastName(),
                userRegisterRequest.getEmail(),
                userRegisterRequest.getPassword()
        );

        if (userRegisterRequest.getRole().equalsIgnoreCase(ADMIN)) {
            user.setRole(UserRole.ROLE_ADMIN);
        }

        return userJpaRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userJpaRepository.findAll().stream()
                .map(userEntity -> userEntity.toDomainModel())
                .collect(Collectors.toList());
    }

    @Override
    public User getUserById(UUID id) {
        final User singleUser = userJpaRepository.findById(id).get().toDomainModel();

        if (singleUser == null) {
            throw new UserNotFoundWithIdException(String.valueOf(id));
        }

        return singleUser;
    }
}
