import { User } from 'models/user';
import { UpdateCardRequest } from 'requestModels/updateCardRequest';

export const getCardData = (fieldValues: any, user: User) => {
  const updateCardRequest: UpdateCardRequest = {
    holderName: fieldValues?.holderName
      ? fieldValues.holderName
      : user?.card.holderName,
    number: fieldValues?.number ? fieldValues.number : user?.card.number,
    expirationDate: fieldValues?.expirationDate
      ? fieldValues.expirationDate
      : user?.card.expirationDate,
    verificationValue: fieldValues?.verificationValue
      ? fieldValues.verificationValue
      : user?.card.verificationValue,
  };

  return updateCardRequest;
};
