import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { usePage } from 'hooks/usePage';
import { useUser } from 'hooks/useUser';

import userService from 'services/userService';
import { storageService } from 'services/storageService';

import { MY_ACCOUNT } from 'util/constants';
import EN_STRINGS from 'translation/en';

import './user-settings.scss';

const UserSettings = () => {
  const { setNavbarTitle, setNavbarItems } = usePage();
  const { resetLoggedInUser } = useUser();
  
  const navigate = useNavigate();
  
  const deactivateAccount = () => {
    userService.deactivate().then((response) => {
      storageService.clear();
      resetLoggedInUser();
      navigate('/');
    });
  };

  useEffect(() => {
    setNavbarTitle(EN_STRINGS.MY_ACCOUNT.SETTINGS);
    setNavbarItems([
      EN_STRINGS.NAVBAR.MY_ACCOUNT,
      EN_STRINGS.MY_ACCOUNT.SETTINGS,
    ]);
  }, [setNavbarItems, setNavbarTitle]);

  return (
    <div className='c-settings-wrapper'>
      <div className='c-settings-container c-policy-container'>
        <p>{EN_STRINGS.MY_ACCOUNT.POLICY_AND_COMMUNITY}</p>

        <h4>{EN_STRINGS.MY_ACCOUNT.POLICY_AND_COMMUNITY_TITLE}</h4>

        <label>
          <input type='checkbox' /> <p>{EN_STRINGS.MY_ACCOUNT.EMAIL}</p>
        </label>

        <label>
          <input type='checkbox' />{' '}
          <p>{EN_STRINGS.MY_ACCOUNT.PUSH_NOTIFICATION}</p>
        </label>

        <label>
          <input type='checkbox' />{' '}
          <p>{EN_STRINGS.MY_ACCOUNT.SMS_NOTIFICATION}</p>
        </label>
      </div>

      <div className='c-settings-container c-contact-container'>
        <p>{EN_STRINGS.MY_ACCOUNT.CONTACT_INFORMATION}</p>

        <h4>{EN_STRINGS.MY_ACCOUNT.CONTACT_INFORMATION_TITLE}</h4>

        <label>
          <h4>{EN_STRINGS.MY_ACCOUNT.EMAIL}</h4>
          <p>{MY_ACCOUNT.EMAIL}</p>
        </label>

        <label>
          <h4>{EN_STRINGS.MY_ACCOUNT.PHONE}</h4>
          <p>{MY_ACCOUNT.PHONE}</p>
        </label>
      </div>

      <div className='c-settings-container c-account-container'>
        <p>{EN_STRINGS.MY_ACCOUNT.ACCOUNT}</p>

        <h4>{EN_STRINGS.MY_ACCOUNT.ACCOUNT_TITLE}</h4>

        <button onClick={deactivateAccount}>
          {EN_STRINGS.MY_ACCOUNT.DEACTIVATE}
        </button>
      </div>
    </div>
  );
};

export default UserSettings;
