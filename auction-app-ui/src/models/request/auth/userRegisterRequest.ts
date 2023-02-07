import { AuthenticationProvider } from 'models/enum/authenticationProvider';

export type UserRegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password?: string;
  authenticationProvider: AuthenticationProvider
};
