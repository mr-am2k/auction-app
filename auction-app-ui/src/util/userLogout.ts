import authService from 'services/authService';
import { storageService } from 'services/storageService';

import { LOCAL_STORAGE } from './constants';

export const userLogout = () => {
  authService.logout();

  storageService.removeAll([
    LOCAL_STORAGE.ACCESS_TOKEN,
    LOCAL_STORAGE.REFRESH_TOKEN,
    LOCAL_STORAGE.ID,
    LOCAL_STORAGE.FULL_NAME,
    LOCAL_STORAGE.ROLE,
  ]);
};
