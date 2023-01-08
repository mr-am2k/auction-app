package com.internship.auctionapp.repositories.address;

import com.internship.auctionapp.entities.AddressEntity;
import com.internship.auctionapp.models.Address;
import com.internship.auctionapp.requests.CreateAddressRequest;

import java.util.UUID;

public interface AddressRepository {
    AddressEntity addAddress(CreateAddressRequest createAddressRequest);

    AddressEntity getSingleAddress(UUID id);

    AddressEntity updateAddress(UUID id, CreateAddressRequest updateAddressRequest);
}
