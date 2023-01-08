package com.internship.auctionapp.repositories.address;

import com.internship.auctionapp.entities.AddressEntity;
import com.internship.auctionapp.middleware.exception.AddressNotFoundException;
import com.internship.auctionapp.requests.CreateAddressRequest;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public class DefaultAddressRepository implements AddressRepository {
    private final AddressJpaRepository addressJpaRepository;

    public DefaultAddressRepository(AddressJpaRepository addressJpaRepository) {
        this.addressJpaRepository = addressJpaRepository;
    }

    @Override
    public AddressEntity addAddress(CreateAddressRequest createAddressRequest) {
        AddressEntity address = new AddressEntity();

        address.setStreet(createAddressRequest.getStreet());
        address.setCity(createAddressRequest.getCity());
        address.setState(createAddressRequest.getState());
        address.setCountry(createAddressRequest.getCountry());
        address.setZipCode(createAddressRequest.getZipCode());

        return addressJpaRepository.save(address);
    }

    @Override
    public AddressEntity getSingleAddress(UUID id) {
        return addressJpaRepository.findById(id).orElseThrow(() -> new AddressNotFoundException(id.toString()));
    }

    @Override
    public AddressEntity updateAddress(UUID id, CreateAddressRequest updateAddressRequest) {
        AddressEntity existingAddress = getSingleAddress(id);

        existingAddress.setStreet(updateAddressRequest.getStreet());
        existingAddress.setCity(updateAddressRequest.getCity());
        existingAddress.setCountry(updateAddressRequest.getCountry());
        existingAddress.setZipCode(updateAddressRequest.getZipCode());
        existingAddress.setState(updateAddressRequest.getState());

        return addressJpaRepository.save(existingAddress);
    }
}
