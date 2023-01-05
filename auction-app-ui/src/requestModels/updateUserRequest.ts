export type UpdateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImageUrl: string | null;
  dateOfBirth: Date;
  street: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
};
