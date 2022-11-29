import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FacebookIcon, InstagramIcon, TwitterIcon } from 'assets/icons';
import EN_STRINGS from 'util/en_strings';
import ROUTES from 'util/routes';

import './header.scss';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
        {isLoggedIn && <p>Hi, John Doe</p>}
        {/* Can happen to redirect logged in user on register page and keep this message, but in future if he redirects on register/login he will be logged out, so this won't happen */}
        {!isLoggedIn && (
          <>
            <Link to={`/${ROUTES.LOGIN}`} className='c-header-link-item'>
              {EN_STRINGS.HEADER.LOGIN}
            </Link>
            <span>or</span>
            <Link to={`/${ROUTES.REGISTER}`} className='c-header-link-item'>
              {EN_STRINGS.HEADER.CREATE_ACCOUNT}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
