import { User } from 'models/user';
import { UpdateUserRequest } from 'requestModels/updateUserRequest';

export const getUserData = (fieldValues: any, user: User) => {
  const updateUserRequest: UpdateUserRequest = {
    firstName: fieldValues?.firstName ? fieldValues.firstName : user?.firstName,
    lastName: fieldValues?.lastName ? fieldValues.lastName : user?.lastName,
    email: fieldValues?.email ? fieldValues.email : user?.email,
    phoneNumber: fieldValues?.phoneNumber
      ? fieldValues.phoneNumber
      : user?.phoneNumber,
    imageUrl: fieldValues?.imageUrl ? fieldValues.imageUrl : user?.imageUrl,
    dateOfBirth: fieldValues?.dateOfBirth
      ? fieldValues.dateOfBirth
      : user?.dateOfBirth,
    street: fieldValues?.street ? fieldValues.street : user?.street,
    city: fieldValues?.city ? fieldValues.city : user?.city,
    zipCode: fieldValues?.zipCode ? fieldValues.zipCode! : user?.zipCode,
    state: fieldValues?.state ? fieldValues.state! : user?.state,
    country: fieldValues?.country ? fieldValues.country! : user?.country,
  };

  return updateUserRequest;
};
