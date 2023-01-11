import { Address } from './address';
import { Card } from './card';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImageUrl: string;
  dateOfBirth: Date;
  address: Address
  card: Card;
};