import { useState } from 'react';
import { Link } from 'react-router-dom';

import { SearchIcon, CloseIcon } from 'assets/icons';
import auctionAppLogo from 'assets/logo/auction-app-logo.svg';
import EN_STRINGS from 'util/en_strings';
import ROUTES from 'util/routes';

import './navbar.scss';

const Navbar = () => {
  const [inputContent, setInputContent] = useState('');
  const handleSearch = () => {
    console.log(inputContent);
  };

  return (
    <div className='c-navbar'>
      <div className='c-navbar-logo'>
        <img src={auctionAppLogo} alt='Auction App' />
      </div>

      <div className='c-search-field'>
        <input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setInputContent(event.target.value)
          }
          type='text'
          placeholder={EN_STRINGS.NAVBAR.INPUT_PLACEHOLDER}
          value={inputContent}
        />

        <div className='c-search-input-icons'>
          {inputContent.length > 0 && (
            <span onClick={() => setInputContent('')}>
              <CloseIcon />
            </span>
          )}
          <span onClick={handleSearch}>
            <SearchIcon />
          </span>
        </div>
      </div>

      <div className='c-navbar-options'>
        <Link to='/'>{EN_STRINGS.NAVBAR.HOME.toUpperCase()}</Link>
        <Link to={`/${ROUTES.SHOP}`}>
          {EN_STRINGS.NAVBAR.SHOP.toUpperCase()}
        </Link>
        <Link to={`/${ROUTES.MY_ACCOUNT}`}>
          {EN_STRINGS.NAVBAR.MY_ACCOUNT.toUpperCase()}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
