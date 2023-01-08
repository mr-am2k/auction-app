package com.internship.auctionapp.repositories.user;

import com.internship.auctionapp.entities.AddressEntity;
import com.internship.auctionapp.entities.CreditCardEntity;
import com.internship.auctionapp.entities.UserEntity;
import com.internship.auctionapp.middleware.exception.UserNotFoundByIdException;
import com.internship.auctionapp.models.User;
import com.internship.auctionapp.repositories.creditCard.CreditCardJpaRepository;
import com.internship.auctionapp.requests.CreateAddressRequest;
import com.internship.auctionapp.requests.CreateCreditCardRequest;
import com.internship.auctionapp.requests.UpdateUserRequest;
import com.internship.auctionapp.requests.UserRegisterRequest;
import com.internship.auctionapp.services.address.AddressService;
import com.internship.auctionapp.services.creditCard.CreditCardService;
import com.internship.auctionapp.util.UserRole;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class DefaultUserRepository implements UserRepository {
    private final UserJpaRepository userJpaRepository;

    private final AddressService addressService;

    private final CreditCardService creditCardService;

    private static final ModelMapper modelMapper = new ModelMapper();

    public DefaultUserRepository(UserJpaRepository userJpaRepository, AddressService addressService, CreditCardService creditCardService) {
        this.userJpaRepository = userJpaRepository;
        this.addressService = addressService;
        this.creditCardService = creditCardService;
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
    public User getUser(UUID userId) {
        final UserEntity user = userJpaRepository.findById(userId).orElseThrow(() -> new UserNotFoundByIdException(userId.toString()));

        return user.toDomainModel();
    }

    @Override
    @Transactional
    public User updateUser(
            String username,
            UpdateUserRequest updateUserRequest,
            CreateCreditCardRequest createCreditCardRequest,
            CreateAddressRequest updateAddressRequest
    ) {
        UserEntity user = userJpaRepository.findByUsername(username);

        UserEntity updatedUser = modelMapper.map(updateUserRequest, UserEntity.class);

        updatedUser.setId(user.getId());
        updatedUser.setUsername(updatedUser.getEmail());
        updatedUser.setPasswordHash(user.getPasswordHash());
        updatedUser.setRole(user.getRole());
        updatedUser.setActive(user.isActive());

        if (updateAddressRequest != null) {
            AddressEntity address = addressService.updateAddress(user.getAddress(), updateAddressRequest);
            updatedUser.setAddress(address);
        }

        if (createCreditCardRequest != null) {
            CreditCardEntity creditCard = creditCardService.updateCreditCard(user.getCreditCard(), createCreditCardRequest);
            updatedUser.setCreditCard(creditCard);
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