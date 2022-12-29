import { usePage } from 'hooks/usePage';
import './profile.scss';
import { useEffect, useState } from 'react';
import EN_STRINGS from 'translation/en';

import { useForm } from 'hooks/useForm';
import { PersonalForm, LocationForm, CardForm } from 'components';

const Profile = () => {
  const { setNavbarTitle, setNavbarItems } = usePage();
  const { fieldValues } = useForm();
  const [loginError, setLoginError] = useState<string>();

  const submitForm = () => {
    console.log(fieldValues);
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
      <PersonalForm onSubmit={submitForm} errorMessage={error} />
      <CardForm onSubmit={submitForm} errorMessage={error} />
      <LocationForm onSubmit={submitForm} errorMessage={error} />
      <button onClick={submitForm}>Test</button>
    </div>
  );
};

export default Profile;
