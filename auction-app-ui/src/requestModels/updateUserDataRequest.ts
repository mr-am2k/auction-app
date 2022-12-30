import { UpdateCardRequest } from './updateCardRequest';
import { UpdateUserRequest } from './updateUserRequest';

export type UpdateUserDataRequest = {
  updateUserRequest: UpdateUserRequest;
  updateCardRequest: UpdateCardRequest;
};
