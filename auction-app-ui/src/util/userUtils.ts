import { User } from 'models/user';
import { UpdateUserRequest } from 'models/request/update/updateUserRequest';

export const getUserData = (fieldValues: any, user: User) => {
  const updateUserRequest: UpdateUserRequest = {
    firstName: fieldValues?.firstName || user?.firstName,
    lastName: fieldValues?.lastName || user?.lastName,
    email: fieldValues?.email || user?.email,
    phoneNumber: fieldValues?.phoneNumber || user?.phoneNumber,
    profileImageUrl: user?.profileImageUrl || null,
    dateOfBirth: fieldValues?.dateOfBirth || user?.dateOfBirth,
    address: null,
  };

  return updateUserRequest;
};
