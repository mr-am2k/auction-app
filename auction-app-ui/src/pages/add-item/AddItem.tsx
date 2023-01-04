import { ItemForm, LocationShipping, Prices } from 'components';
import './add-item.scss';
import { useEffect, useState } from 'react';
import { useForm } from 'hooks/useForm';
import { User } from 'models/user';
import userService from 'services/userService';
import { getUserData } from 'util/getUserData';
import { getCardData } from 'util/getCardData';
import { UpdateUserDataRequest } from 'requestModels/updateUserDataRequest';

const AddItem = () => {
  const {
    fieldValues,
    validateForm,
    resetFieldValues,
    setFieldValidationResults,
  } = useForm();
  const [pageNumber, setPageNumber] = useState(1);
  const [user, setUser] = useState<User>();

  const getUser = () => {
    userService.getUser().then((user) => setUser(user));
  };

  const handleNext = () => {
    const isValid = validateForm();

    setPageNumber((prevNumber) => prevNumber + 1);
    if (isValid) {
    }
  };

  const handlePrevious = () => {
    setPageNumber((prevNumber) => prevNumber - 1);
  };

  const addProduct = async () => {
    const updateUserRequest = getUserData(fieldValues, user!);
    const updateCardRequest = getCardData(fieldValues, user!);

    const updateUserDataRequest: UpdateUserDataRequest = {
      updateUserRequest,
      updateCardRequest,
    };

    await userService.updateUser(user!.id, updateUserDataRequest);
  };

  useEffect(() => {
    getUser();
    return () => {
      resetFieldValues();
      setFieldValidationResults({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='c-add-item-wrapper'>
      {pageNumber === 1 && <ItemForm handleNext={handleNext} />}
      {pageNumber === 2 && (
        <Prices handleNext={handleNext} handlePrevious={handlePrevious} />
      )}
      {pageNumber === 3 && (
        <LocationShipping
          user={user}
          handlePrevious={handlePrevious}
          onSubmit={addProduct}
        />
      )}
    </div>
  );
};

export default AddItem;
