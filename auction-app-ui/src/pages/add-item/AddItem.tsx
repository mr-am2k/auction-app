import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import userService from 'services/userService';
import productsService from 'services/productService';
import { imageService } from 'services/imageService';

import { useForm } from 'hooks/useForm';

import { ItemForm, LocationShipping, Prices } from 'components';
import { User } from 'models/user';
import { CreateProductRequest } from 'requestModels/createProductRequest';
import { UpdateUserDataRequest } from 'requestModels/updateUserDataRequest';
import { getUserData } from 'util/getUserData';
import { getCardData } from 'util/getCardData';
import { FOLDERS, FORM, LOCAL_STORAGE } from 'util/constants';
import { ROUTES } from 'util/routes';

import './add-item.scss';

import classNames from 'classnames';
import { storageService } from 'services/storageService';

const AddItem = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [user, setUser] = useState<User>();
  const [saving, setSaving] = useState(false);

  const {
    fieldValues,
    validateForm,
    resetFieldValues,
    setFieldValidationResults,
  } = useForm();

  const navigate = useNavigate();

  const getUser = () => {
    userService
      .getUser(storageService.get(LOCAL_STORAGE.ID)!)
      .then((user) => setUser(user));
  };

  const handleNext = () => {
    const isValid = validateForm();

    if (isValid) {
      setPageNumber((prevNumber) => prevNumber + 1);
    }
  };

  const handlePrevious = () => {
    setPageNumber((prevNumber) => prevNumber - 1);
  };

  const addProduct = async () => {
    setSaving(true);

    const updateUserRequest = getUserData(fieldValues, user!);
    const updateCardRequest = getCardData(fieldValues, user!);

    const updateUserDataRequest: UpdateUserDataRequest = {
      updateUserRequest,
      updateCardRequest,
    };

    await userService.updateUser(user!.id, updateUserDataRequest);

    const imageURLs = await imageService.uploadImages(
      FOLDERS.PRODUCT,
      fieldValues[FORM.IMAGES]
    );

    const product: CreateProductRequest = {
      name: fieldValues[FORM.PRODUCT],
      description: fieldValues[FORM.DESCRIPTION],
      imageURLs: imageURLs,
      startPrice: fieldValues[FORM.PRICE],
      categoryId: fieldValues[FORM.SUBCATEGORY],
      creationDateTime: fieldValues[FORM.START_DATE],
      expirationDateTime: fieldValues[FORM.END_DATE],
      userId: storageService.get(LOCAL_STORAGE.ID)!,
    };

    productsService.addProduct(product).then(() => {
      setSaving(false);
      navigate(ROUTES.MY_ACCOUNT);
    });
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
      <div className='c-dots'>
        <span className='c-dot c-dot-active' />

        <hr
          className={classNames({
            'c-hr-active': pageNumber >= 2,
          })}
        />

        <span
          className={classNames({
            'c-dot': true,
            'c-dot-active': pageNumber >= 2,
          })}
        />

        <hr
          className={classNames({
            'c-hr-active': pageNumber === 3,
          })}
        />

        <span
          className={classNames({
            'c-dot': true,
            'c-dot-active': pageNumber === 3,
          })}
        />
      </div>
      {pageNumber === 1 && <ItemForm handleNext={handleNext} />}
      {pageNumber === 2 && (
        <Prices handleNext={handleNext} handlePrevious={handlePrevious} />
      )}
      {pageNumber === 3 && (
        <LocationShipping
          user={user}
          handlePrevious={handlePrevious}
          onSubmit={addProduct}
          saving={saving}
        />
      )}
    </div>
  );
};

export default AddItem;
