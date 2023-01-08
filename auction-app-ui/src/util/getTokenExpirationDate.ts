import jwt_decode from 'jwt-decode';

export const getTokenExpirationDate = (token: string) => {

    try {
        const decoded: any = jwt_decode(token);
        const expirationDate = new Date(decoded.exp * 1000); 
        return expirationDate
      } catch (error) {
        return;
      }
};
