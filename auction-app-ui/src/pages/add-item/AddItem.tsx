import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useForm } from 'hooks/useForm';
import { useUser } from 'hooks/useUser';

import userService from 'services/userService';
import productsService from 'services/productService';
import { fileUploadService } from 'services/fileUploadService';
import { storageService } from 'services/storageService';


import { ItemForm, ShippingDetails, Prices } from 'components';
import { Error } from '../index'
import { User } from 'models/user';
import { CreateProductRequest } from 'models/request/create/createProductRequest';
import { CreateProductDataRequest } from 'models/request/create/createProductDataRequest';
import { getCardData } from 'util/creditCardUtils';
import { getAddressData } from 'util/addressUtils';
import { FOLDERS, PRODUCT_FORM, LOCAL_STORAGE, ADD_ITEM } from 'util/constants';
import { ROUTES } from 'util/routes';

import './add-item.scss';

import classNames from 'classnames';

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

  const { isUserLoggedIn } = useUser();

  const getUser = () => {
    userService
      .getUser(storageService.get(LOCAL_STORAGE.ID)!)
      .then((user) => setUser(user));
  };

  const handleNextStep = () => {
    const isValid = validateForm();

    if (isValid) {
      setPageNumber((prevNumber) => prevNumber + 1);
    }
  };

  const handleBackStep = () => {
    setPageNumber((prevNumber) => prevNumber - 1);
  };

  const addProduct = async () => {
    setSaving(true);

    const createCreditCardRequest = getCardData(fieldValues, user!);
    const createAddressRequest = getAddressData(fieldValues, user!);

    const imageURLs = await fileUploadService.uploadFiles(
      FOLDERS.PRODUCT,
      fieldValues[PRODUCT_FORM.IMAGES]
    );

    const createProductRequest: CreateProductRequest = {
      name: fieldValues[PRODUCT_FORM.PRODUCT],
      description: fieldValues[PRODUCT_FORM.DESCRIPTION],
      imageURLs: imageURLs,
      startPrice: fieldValues[PRODUCT_FORM.PRICE],
      categoryId: fieldValues[PRODUCT_FORM.SUBCATEGORY],
      creationDateTime: fieldValues[PRODUCT_FORM.START_DATE],
      expirationDateTime: fieldValues[PRODUCT_FORM.END_DATE],
      userId: storageService.get(LOCAL_STORAGE.ID)!,
      address: createAddressRequest
    };

    const createProductDataRequest: CreateProductDataRequest = {
      createProductRequest,
      createCreditCardRequest
    }

    productsService.addProduct(createProductDataRequest).then(() => {
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

  if (!isUserLoggedIn()) {
    return <Error/>
  }

  return (
    <div className='c-add-item-wrapper'>
      <div className='c-dots'>
        <span className='c-dot c-dot--active' />

        <hr
          className={classNames({
            'c-hr--active': pageNumber >= ADD_ITEM.PAGE_NUMBER_2,
          })}
        />

        <span
          className={classNames('c-dot', {
            'c-dot--active': pageNumber >= ADD_ITEM.PAGE_NUMBER_2,
          })}
        />

        <hr
          className={classNames({
            'c-hr--active': pageNumber === ADD_ITEM.PAGE_NUMBER_3,
          })}
        />

        <span
          className={classNames('c-dot', {
            'c-dot--active': pageNumber === ADD_ITEM.PAGE_NUMBER_3,
          })}
        />
      </div>
      {pageNumber === 1 && <ItemForm handleNextStep={handleNextStep} />}
      {pageNumber === 2 && (
        <Prices handleNextStep={handleNextStep} handleBackStep={handleBackStep} />
      )}
      {pageNumber === 3 && (
        <ShippingDetails
          user={user}
          handleBackStep={handleBackStep}
          onSubmit={addProduct}
          saving={saving}
        />
      )}
    </div>
  );
};

export default AddItem;
