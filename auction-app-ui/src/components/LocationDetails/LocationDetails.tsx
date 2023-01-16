import { useState } from 'react';

import { LocationForm } from '../index';
import { User } from 'models/user';
import arrowUp from 'assets/images/arrow-up.png';
import arrowDown from 'assets/images/arrow-down.png';
import { EN_STRINGS } from 'translation/en';

import './location-details.scss';

import classNames from 'classnames';

type Props = {
  children?: React.ReactNode;
  user: User | undefined;
};

const LocationDetails: React.FC<Props> = ({ user }) => {
  const [displayShipping, setDisplayShipping] = useState(true);

  const changeDisplayShipping = () => {
    setDisplayShipping(displayShipping => !displayShipping);
  };

  return (
    <div className='c-location-wrapper'>
      <div className='c-location-header' onClick={changeDisplayShipping}>
        <img src={!displayShipping ? arrowUp : arrowDown} alt={EN_STRINGS.PROFILE.SHIPPING} />
        <p>{EN_STRINGS.PROFILE.SHIPPING}</p>
      </div>

      <div
        className={classNames({
          'c-display-shipping': displayShipping,
          'c-location-content': !displayShipping,
        })}
      >
        <LocationForm user={user} />
      </div>
    </div>
  );
};

export default LocationDetails;
