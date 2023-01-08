import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from 'hooks/useForm';

import { User } from 'models/user';
import { CreditCardForm, Splitter, LocationForm } from '../index';
import EN_STRINGS from 'translation/en';
import { ROUTES } from 'util/routes';
import maestro from 'assets/images/maestro.png';
import visa from 'assets/images/visa.png';
import mastercard from 'assets/images/mastercard.png';
import americanExpress from 'assets/images/american-express.png';

import './shipping-details.scss';
import 'scss/settings.scss';

type Props = {
  children?: React.ReactNode;
  user: User | undefined;
  saving: boolean;
  handleBackStep: () => void;
  onSubmit: () => void;
};

const ShippingDetails: React.FC<Props> = ({
  user,
  saving,
  handleBackStep,
  onSubmit,
}) => {
  const [cardDisplayed, setCardDisplayed] = useState(false);

  const { validateForm } = useForm();

  const handleFormSubmit = () => {
    const isValid = validateForm();

    if (isValid) {
      onSubmit();
    }
  };

  const handleNextStep = () => {
    const isValid = validateForm();

    if (isValid) {
      setCardDisplayed(true);
    }
  };

  return (
    <div className='c-location-shipping-page'>
      <h3>{EN_STRINGS.LOCATION_SHIPPING.LOCATION_SHIPPING}</h3>

      <div className='c-location-part c-buttons'>
        <LocationForm user={user} required={true} />
        {!cardDisplayed && (
          <div className='c-buttons'>
            <Link to={ROUTES.MY_ACCOUNT}>
              <button>{EN_STRINGS.PRICES_FORM.CANCEL_BUTTON}</button>
            </Link>

            <div className='c-control-buttons'>
              <button onClick={handleBackStep}>
                {EN_STRINGS.PRICES_FORM.BACK_BUTTON}
              </button>

              <button className='c-next-button' onClick={handleNextStep}>
                {EN_STRINGS.PRICES_FORM.NEXT_BUTTON}
              </button>
            </div>
          </div>
        )}
      </div>

      {cardDisplayed && (
        <>
          <h4>{EN_STRINGS.LOCATION_SHIPPING.FEATURED}</h4>

          <div className='c-card-part c-buttons'>
            <Splitter />

            <div className='c-allowed-cards'>
              <p className='c-allowed-message'>
                {EN_STRINGS.LOCATION_SHIPPING.CARD_MESSAGE}
              </p>

              <div className='c-cards'>
                <img src={visa} alt='card' />
                <img src={mastercard} alt='card' />
                <img src={americanExpress} alt='card' />
                <img src={maestro} alt='card' />
              </div>
            </div>

            <CreditCardForm user={user} required={true} />

            <div className='c-buttons'>
              <Link to={ROUTES.MY_ACCOUNT}>
                <button disabled={saving}>
                  {EN_STRINGS.LOCATION_SHIPPING.CANCEL_BUTTON}
                </button>
              </Link>

              <div className='c-control-buttons'>
                <button
                  className='c-default-button'
                  disabled={saving}
                  onClick={() => setCardDisplayed(false)}
                >
                  {EN_STRINGS.LOCATION_SHIPPING.BACK_BUTTON}
                </button>

                <button
                  className='c-next-button c-default-button'
                  disabled={saving}
                  onClick={handleFormSubmit}
                >
                  {!saving ? 
                    EN_STRINGS.LOCATION_SHIPPING.DONE_BUTTON : 
                    EN_STRINGS.LOCATION_SHIPPING.SAVING}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShippingDetails;
