import jwt_decode from 'jwt-decode';

export const getTokenExpirationDate = (token: string) => {
  try {
    return new Date(jwt_decode<any>(token).exp * 1000);
  } catch (error) {
    return -1;
  }
};
