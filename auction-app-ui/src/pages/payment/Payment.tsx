import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useForm } from 'hooks/useForm';

import productsService from 'services/productService';
import userService from 'services/userService';
import { storageService } from 'services/storageService';

import { CreditCardForm, Loading } from 'components';
import { Product } from 'models/product';
import { User } from 'models/user';
import { CreatePaymentRequest } from 'models/request/create/createPaymentRequest';
import { LOCAL_STORAGE, PAYMENT_SUCCESS_DELAY } from 'util/constants';
import { getCardData } from 'util/creditCardUtils';
import { PAYMENT } from 'translation/en';

import './payment.scss';

const Payment = () => {
  const [product, setProduct] = useState<Product>();
  const [user, setUser] = useState<User>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const { fieldValues, validateForm } = useForm();

  const params = useParams();
  const navigate = useNavigate();

  const fetchProduct = () => {
    productsService.getSingleProduct(params.productId!).then(product => setProduct(product));
  };

  const fetchCard = () => {
    userService.getUser(storageService.get(LOCAL_STORAGE.ID)!).then(user => {
      setUser(user);
    });
  };

  const handlePayment = () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setLoading(true);

    const creditCardData = getCardData(fieldValues, user!);

    const createPaymentRequest: CreatePaymentRequest = {
      productId: product?.id!,
      creditCardId: user!.card?.id,
      createCreditCardRequest: creditCardData,
    };

    productsService
      .pay(createPaymentRequest)
      .then(paymentResponse => {
        if (paymentResponse) {
          setSuccessMessage(PAYMENT.SUCCESS_MESSAGE);

          setLoading(false);

          setTimeout(() => {
            navigate('/');
          }, PAYMENT_SUCCESS_DELAY);
        }
      })
      .catch(error => setErrorMessage(error.response.data.message));
  };

  useEffect(() => {
    fetchProduct();
    fetchCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='c-payment-page-wrapper'>
      {user && (
        <div className='c-payment-form'>
          <h3>{PAYMENT.PAYMENT_TITLE}</h3>

          <CreditCardForm user={user} required={true} />

          {successMessage && <p className='c-success-paragraph'>{successMessage}</p>}

          {errorMessage && <p className='c-error-paragraph'>{errorMessage}</p>}

          {loading ? <Loading /> : !product?.paid && <button onClick={handlePayment}>{PAYMENT.PAY}</button>}
        </div>
      )}

      {!user && <Loading />}
    </div>
  );
};

export default Payment;
