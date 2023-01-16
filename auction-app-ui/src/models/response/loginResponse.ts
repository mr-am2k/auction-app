export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  type: string;
  id: string;
  email: string;
  fullName: string;
  roles: string[];
};
