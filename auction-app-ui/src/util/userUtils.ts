import { User } from 'models/user';
import { UpdateUserRequest } from 'models/request/update/updateUserRequest';

export const getUserData = (fieldValues: any, user: User) => {
  const updateUserRequest: UpdateUserRequest = {
    firstName: fieldValues?.firstName ? fieldValues.firstName : user?.firstName,
    lastName: fieldValues?.lastName ? fieldValues.lastName : user?.lastName,
    email: fieldValues?.email ? fieldValues.email : user?.email,
    phoneNumber: fieldValues?.phoneNumber ? 
      fieldValues.phoneNumber : 
      user?.phoneNumber,
    profileImageUrl: user?.profileImageUrl ? user.profileImageUrl : null,
    dateOfBirth: fieldValues?.dateOfBirth ?   
      fieldValues.dateOfBirth : 
      user?.dateOfBirth,
    address: null
  };

  return updateUserRequest;
};
