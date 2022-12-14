import { User } from 'models/user';

export const checkIfStringIsEmpty = (text: string) => {
  if (!text.length) {
    return true;
  }
  return false;
};

export const getUserFromLocalStorage = () => {
  const id = localStorage.getItem('id')
  const token = localStorage.getItem('token');

  if(!id?.length || !token?.length){
    const user : User = {
      id: id!,
      token: token!
    }

    return user;
  }

  return null;
}