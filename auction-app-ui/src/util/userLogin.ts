import { LoggedInUser } from 'models/loggedInUser';
import authService from 'services/authService';
import { storageService } from 'services/storageService';
import { LOCAL_STORAGE } from './constants';

export const userLogin = async () => {
  const authResponse = await authService.refreshToken();

  storageService.add(LOCAL_STORAGE.ACCESS_TOKEN, authResponse.accessToken);
  
  const user: LoggedInUser = {
    id: storageService.get(LOCAL_STORAGE.ID)!,
    accessToken: authResponse.accessToken,
  };

  return user;
};
