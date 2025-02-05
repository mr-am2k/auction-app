import { CreateAddressRequest } from './createAddressRequest';

export type CreateProductRequest = {
  name: string;
  description: string;
  imageURLs: string[];
  startPrice: number;
  categoryId: string;
  subcategoryId: string;
  creationDateTime: Date;
  expirationDateTime: Date;
  userId: string;
  address: CreateAddressRequest;
};
