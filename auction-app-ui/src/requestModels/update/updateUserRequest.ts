export type UpdateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImageUrl: string | null;
  dateOfBirth: Date;
};
