import { User } from 'models/user';
import { CreateAddressRequest } from 'models/request/create/createAddressRequest';

export const getAddressData = (fieldValues: any, user: User) => {
  const updateAddressRequest: CreateAddressRequest = {
    street: fieldValues?.street ? fieldValues.street : user?.address?.street,
    city: fieldValues?.city ? fieldValues.city : user?.address?.city,
    zipCode: fieldValues?.zipCode ? fieldValues.zipCode! : user?.address?.zipCode,
    state: fieldValues?.state ? fieldValues.state! : user?.address?.state,
    country: fieldValues?.country ? fieldValues.country! : user?.address?.country,
  };

  return updateAddressRequest;
};
