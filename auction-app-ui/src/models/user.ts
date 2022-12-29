import { Card } from './card';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  imageUrl: string;
  dateOfBirth: Date;
  street: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  card: Card;
};