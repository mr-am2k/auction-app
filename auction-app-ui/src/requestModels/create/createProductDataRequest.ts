import { CreateAddressRequest } from './createAddressRequest';
import { CreateCreditCardRequest } from './createCreditCardRequest';
import { CreateProductRequest } from './createProductRequest';

export type CreateProductDataRequest = {
  createProductRequest: CreateProductRequest;
  createAddressRequest: CreateAddressRequest;
  createCreditCardRequest: CreateCreditCardRequest;
};
