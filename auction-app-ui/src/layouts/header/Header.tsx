import { useState } from 'react';
import { Link } from 'react-router-dom';
import facebookIcon from '../../assets/icons/facebookIcon.png';
import instagramIcon from '../../assets/icons/instagramIcon.png';
import twitterIcon from '../../assets/icons/twitterIcon.png';

import classes from './Header.module.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className={classes.header}>
      <div className={classes.headerIcons}>
        <a href='http://www.facebook.com' target='_blank' rel='noreferrer'>
          <img src={facebookIcon} alt='Facebook icon' />
        </a>
        <a href='http://www.instagram.com' target='_blank' rel='noreferrer'>
          <img src={instagramIcon} alt='Instagram icon' />
        </a>
        <a href='http://www.twitter.com' target='_blank' rel='noreferrer'>
          <img src={twitterIcon} alt='Twitter icon' />
        </a>
      </div>
      <div className={classes.headerMessage}>
        {isLoggedIn && <p>Hi, John Doe</p>}
        {/* Can happen to redirect logged in user on register page and keep this message, but in future if he redirects on register/login he will be logged out, so this won't happen */}
        {!isLoggedIn && (
          <>
            <Link to='/login' className={classes.loginOrRegister}>
              Login
            </Link>
            <span>or</span>
            <Link to='/register' className={classes.loginOrRegister}>
              Create an Account
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
