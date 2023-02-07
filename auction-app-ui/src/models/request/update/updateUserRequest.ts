import { AuthenticationProvider } from 'models/enum/authenticationProvider';
import { CreateAddressRequest } from 'models/request/create/createAddressRequest';

export type UpdateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImageUrl: string | null;
  dateOfBirth: Date;
  address: CreateAddressRequest | null;
  authenticationProvider: AuthenticationProvider;
};
