import { useEffect, useRef, useState } from 'react';

import { usePage } from 'hooks/usePage';

import userService from 'services/userService';

import { PersonalForm, LocationForm, CardForm } from 'components';
import { User } from 'models/user';
import EN_STRINGS from 'translation/en';
import arrowUp from 'assets/images/arrow-up.png';
import arrowDown from 'assets/images/arrow-down.png';

import './profile.scss';

import classNames from 'classnames';

const Profile = () => {
  const { setNavbarTitle, setNavbarItems } = usePage();;
  const [loginError, setLoginError] = useState<string>();
  const [displayCard, setDisplayCard] = useState(true);
  const [displayShipping, setDisplayShipping] = useState(true);
  const [user, setUser] = useState<User>();
  const [uploadedImage, setUploadedImage] = useState<string | null>();

  const imageRef = useRef<HTMLInputElement>(null);

  const fetchUser = () => {
    userService.getUser().then((response) => setUser(response));
  };

  const imageChange = () => {
    setUploadedImage(imageRef.current?.value);
  };

  const changeDisplayCard = () => {
    setDisplayCard((prevState) => !prevState);
  };

  const changeDisplayShipping = () => {
    setDisplayShipping((prevState) => !prevState);
  };

  const submitForm = () => {};

  useEffect(() => {
    setNavbarTitle(EN_STRINGS.MY_ACCOUNT.PROFILE);
    setNavbarItems([
      EN_STRINGS.NAVBAR.MY_ACCOUNT,
      EN_STRINGS.MY_ACCOUNT.PROFILE,
    ]);
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const error = loginError ? (
    <div className='c-error-message'>
      <p>{loginError}</p>
    </div>
  ) : (
    ''
  );

  return (
    <div className='c-profile-wrapper'>
      <div className='c-profile-information'>
        <div className='c-profile-header'>
          <p>{EN_STRINGS.PROFILE.PERSONAL}</p>
        </div>

        <div className='c-personal-information'>
          <div className='c-personal-image'>
            <img
              src='https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg'
              alt='Profile'
            />
            <label>
              {EN_STRINGS.PROFILE.CHANGE_PHOTO}
              <input
                ref={imageRef}
                onChange={imageChange}
                type='file'
                name='photo'
              />
            </label>
            {uploadedImage && <p>{uploadedImage}</p>}
          </div>
          <PersonalForm errorMessage={error} user={user} />
        </div>
      </div>

      <div className='c-profile-information'>
        <div className='c-profile-header' onClick={changeDisplayCard}>
          <img
            src={!displayCard ? arrowUp : arrowDown}
            alt={EN_STRINGS.PROFILE.CARD}
          />
          <p>{EN_STRINGS.PROFILE.CARD}</p>
        </div>

        <div
          className={classNames({
            'c-display-card': displayCard,
            'c-profile-content': !displayCard,
          })}
        >
          <CardForm errorMessage={error} user={user} />
        </div>
      </div>

      <div className='c-profile-information'>
        <div className='c-profile-header' onClick={changeDisplayShipping}>
          <img
            src={!displayShipping ? arrowUp : arrowDown}
            alt={EN_STRINGS.PROFILE.SHIPPING}
          />
          <p>{EN_STRINGS.PROFILE.SHIPPING}</p>
        </div>

        <div
          className={classNames({
            'c-display-shipping': displayShipping,
            'c-profile-content': !displayShipping,
          })}
        >
          <LocationForm errorMessage={error} user={user} />
        </div>
      </div>

      <button onClick={submitForm}>{EN_STRINGS.PROFILE.BUTTON}</button>
    </div>
  );
};

export default Profile;
