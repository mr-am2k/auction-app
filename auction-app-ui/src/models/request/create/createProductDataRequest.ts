import { CreateCreditCardRequest } from './createCreditCardRequest';
import { CreateProductRequest } from './createProductRequest';

export type CreateProductDataRequest = {
  createProductRequest: CreateProductRequest;
  createCreditCardRequest: CreateCreditCardRequest;
};
