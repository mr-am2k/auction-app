import { Link, useNavigate } from 'react-router-dom';

import { useUser } from 'hooks/useUser';

import authService from 'services/authService';

import { FacebookIcon, InstagramIcon, TwitterIcon } from 'assets/icons';
import EN_STRINGS from 'translation/en';
import { storageService } from 'services/storageService';
import { LOCAL_STORAGE } from 'util/constants';
import { ROUTES } from 'util/routes';

import './header.scss';

const Header = () => {
  const { isUserLoggedIn, resetLoggedInUser } = useUser();

  const navigate = useNavigate();

  const logoutUser = async () => {
    authService.logout();

    storageService.removeAll([
      LOCAL_STORAGE.ACCESS_TOKEN,
      LOCAL_STORAGE.REFRESH_TOKEN,
      LOCAL_STORAGE.ID,
      LOCAL_STORAGE.FULL_NAME,
      LOCAL_STORAGE.ROLE,
    ]);

    navigate('/')

    resetLoggedInUser();
  };

  return (
    <div className='c-header'>
      <div className='c-header-icons'>
        <a href='http://www.facebook.com' target='_blank' rel='noreferrer'>
          <FacebookIcon />
        </a>
        <a href='http://www.instagram.com' target='_blank' rel='noreferrer'>
          <InstagramIcon />
        </a>
        <a href='http://www.twitter.com' target='_blank' rel='noreferrer'>
          <TwitterIcon />
        </a>
      </div>

      <div className='c-header-message'>
        {isUserLoggedIn() && (
          <div>
            <p>Hi, {storageService.get(LOCAL_STORAGE.FULL_NAME)} </p>
            <button onClick={logoutUser}>Logout</button>
          </div>
        )}
        {/* Can happen to redirect logged in user on register page and keep this message, but in future if he redirects on register/login he will be logged out, so this won't happen */}
        {!isUserLoggedIn() && (
          <>
            <Link to={ROUTES.LOGIN} className='c-header-link-item'>
              {EN_STRINGS.HEADER.LOGIN}
            </Link>
            <span>or</span>
            <Link to={ROUTES.REGISTER} className='c-header-link-item'>
              {EN_STRINGS.HEADER.CREATE_ACCOUNT}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
