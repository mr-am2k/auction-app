package com.internship.auctionapp.services.address;

import com.internship.auctionapp.entities.AddressEntity;
import com.internship.auctionapp.repositories.address.AddressRepository;
import com.internship.auctionapp.requests.CreateAddressRequest;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DefaultAddressService implements AddressService {
    private final AddressRepository addressRepository;

    public DefaultAddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public AddressEntity addAddress(CreateAddressRequest createAddressRequest) {
        return addressRepository.addAddress(createAddressRequest);
    }

    @Override
    public AddressEntity getSingleAddress(UUID id) {
        return addressRepository.getSingleAddress(id);
    }

    @Override
    public AddressEntity updateAddress(AddressEntity address, CreateAddressRequest updateAddressRequest) {
        if (address == null) {
            return addAddress(updateAddressRequest);
        }

        return addressRepository.updateAddress(address.getId(), updateAddressRequest);
    }
}
