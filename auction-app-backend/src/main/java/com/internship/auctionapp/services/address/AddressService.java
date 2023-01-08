package com.internship.auctionapp.services.address;

import com.internship.auctionapp.entities.AddressEntity;
import com.internship.auctionapp.models.Address;
import com.internship.auctionapp.requests.CreateAddressRequest;

import java.util.UUID;

public interface AddressService {
    AddressEntity addAddress(CreateAddressRequest createAddressRequest);

    AddressEntity getSingleAddress(UUID id);

    AddressEntity updateAddress(AddressEntity address, CreateAddressRequest updateAddressRequest);
}
