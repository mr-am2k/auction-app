import { CreateCreditCardRequest } from '../create/createCreditCardRequest';
import { UpdateUserRequest } from './updateUserRequest';

export type UpdateUserDataRequest = {
  updateUserRequest: UpdateUserRequest;
  updateCreditCardRequest: CreateCreditCardRequest;
};
