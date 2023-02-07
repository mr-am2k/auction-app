import { AuthenticationProvider } from 'models/enum/authenticationProvider';

export type userRegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password?: string;
  authenticationProvider: AuthenticationProvider
};
