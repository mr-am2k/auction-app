import { usePage } from 'hooks/usePage';
import './profile.scss';
import { useEffect, useRef, useState } from 'react';
import EN_STRINGS from 'translation/en';

import { useForm } from 'hooks/useForm';
import { PersonalForm, LocationForm, CardForm } from 'components';

import classNames from 'classnames';

const Profile = () => {
  const { setNavbarTitle, setNavbarItems } = usePage();
  const { fieldValues, fieldValidationResults } = useForm();
  const [loginError, setLoginError] = useState<string>();
  const [displayCard, setDisplayCard] = useState(true);
  const [displayShipping, setDisplayShipping] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>();

  const imageRef = useRef<HTMLInputElement>(null);

  const imageChange = () => {
    setUploadedImage(imageRef.current?.value);
  };

  const changeDisplayCard = () => {
    setDisplayCard((prevState) => !prevState);
  };

  const changeDisplayShipping = () => {
    setDisplayShipping((prevState) => !prevState);
  };
  const submitForm = () => {
    console.log(fieldValues);
    console.log(fieldValidationResults);
    console.log(imageRef.current?.value.length);
  };

  useEffect(() => {
    setNavbarTitle(EN_STRINGS.MY_ACCOUNT.PROFILE);
    setNavbarItems([
      EN_STRINGS.NAVBAR.MY_ACCOUNT,
      EN_STRINGS.MY_ACCOUNT.PROFILE,
    ]);
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
          <PersonalForm errorMessage={error} />
        </div>
      </div>

      <div className='c-profile-information'>
        <div className='c-profile-header' onClick={changeDisplayCard}>
          <p>{EN_STRINGS.PROFILE.CARD}</p>
        </div>
        <div
          className={classNames({
            'c-display-card': displayCard,
            'c-profile-content': !displayCard,
          })}
        >
          <CardForm errorMessage={error} />
        </div>
      </div>

      <div className='c-profile-information'>
        <div className='c-profile-header' onClick={changeDisplayShipping}>
          <p>{EN_STRINGS.PROFILE.SHIPPING}</p>
        </div>
        <div
          className={classNames({
            'c-display-shipping': displayShipping,
            'c-profile-content': !displayShipping,
          })}
        >
          <LocationForm errorMessage={error} />
        </div>
      </div>

      <button onClick={submitForm}>{EN_STRINGS.PROFILE.BUTTON}</button>
    </div>
  );
};

export default Profile;
