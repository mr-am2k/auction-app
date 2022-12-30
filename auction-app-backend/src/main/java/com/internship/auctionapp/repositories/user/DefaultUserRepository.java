package com.internship.auctionapp.repositories.user;

import com.internship.auctionapp.entities.CardEntity;
import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.middleware.exception.UserNotFoundByIdException;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.repositories.card.CardJpaRepository;
import com.internship.auctionapp.requests.UpdateCardRequest;
import com.internship.auctionapp.requests.UpdateUserRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;
import com.internship.auctionapp.util.UserRole;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class DefaultUserRepository implements UserRepository {
    private final UserJpaRepository userJpaRepository;

    private final CardJpaRepository cardJpaRepository;

    public DefaultUserRepository(UserJpaRepository userJpaRepository, CardJpaRepository cardJpaRepository) {
        this.userJpaRepository = userJpaRepository;
        this.cardJpaRepository = cardJpaRepository;
    }

    @Override
    public UserEntity findByUsername(String username) {
        return userJpaRepository.findByUsername(username);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userJpaRepository.existsByEmail(email);
    }

    @Override
    public UserEntity registerUser(UserRegisterRequest userRegisterRequest) {
        final UserEntity user = new UserEntity();

        user.setFirstName(userRegisterRequest.getFirstName());
        user.setLastName(userRegisterRequest.getLastName());
        user.setEmail(userRegisterRequest.getEmail());
        user.setUsername(userRegisterRequest.getEmail());
        user.setPasswordHash(userRegisterRequest.getPassword());

        if (userRegisterRequest.getRole().equalsIgnoreCase(UserRole.ROLE_ADMIN.getValue())) {
            user.setRole(UserRole.ROLE_ADMIN);
        }

        return userJpaRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userJpaRepository.findAll().stream()
                .map(UserEntity::toDomainModel)
                .collect(Collectors.toList());
    }

    @Override
    public User getSingleUser(String username) {
        final User user = userJpaRepository.findByUsername(username).toDomainModel();

        if (user == null) {
            throw new UsernameNotFoundException(username);
        }

        return user;
    }

    @Override
    @Transactional
    public User updateUser(UUID id, UpdateUserRequest updateUserRequest, UpdateCardRequest updateCardRequest) {
        UserEntity user = userJpaRepository.findById(id).orElseThrow(() -> new UserNotFoundByIdException(id.toString()));

        ModelMapper modelMapper = new ModelMapper();

        UserEntity updatedUser = modelMapper.map(updateUserRequest, UserEntity.class);

        updatedUser.setId(id);
        updatedUser.setUsername(updatedUser.getEmail());
        updatedUser.setPasswordHash(user.getPasswordHash());
        updatedUser.setRole(user.getRole());
        updatedUser.setActive(user.isActive());

        if (user.getCard() == null) {
            CardEntity newCard = new CardEntity();

            newCard.setHolderName(updateCardRequest.getHolderName());
            newCard.setNumber(updateCardRequest.getNumber());
            newCard.setExpirationDate(updateCardRequest.getExpirationDate());
            newCard.setVerificationValue(updateCardRequest.getVerificationValue());

            cardJpaRepository.save(newCard);

            updatedUser.setCard(newCard);
        } else {
            CardEntity existingCard = cardJpaRepository.findById(user.getCard().getId()).get();

            existingCard.setHolderName(updateCardRequest.getHolderName());
            existingCard.setNumber(updateCardRequest.getNumber());
            existingCard.setExpirationDate(updateCardRequest.getExpirationDate());
            existingCard.setVerificationValue(updateCardRequest.getVerificationValue());

            cardJpaRepository.save(existingCard);

            updatedUser.setCard(existingCard);
        }

        return userJpaRepository.save(updatedUser).toDomainModel();
    }

    @Override
    public void deactivate(String username) {
        UserEntity user = userJpaRepository.findByUsername(username);

        user.setActive(false);

        userJpaRepository.save(user);
    }
}
