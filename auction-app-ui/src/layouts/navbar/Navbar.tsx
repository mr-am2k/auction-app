import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import EN_STRINGS from 'util/en_strings';

import auctionAppLogo from 'assets/logo/auction-app-logo.svg';
import { SearchIcon, CloseIcon } from 'assets/icons';
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
          placeholder='Try enter: Shoes'
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
        <Link to='/'>{EN_STRINGS['Navbar.Home']}</Link>
        <Link to='/shop'>{EN_STRINGS['Navbar.Shop']}</Link>
        <Link to='/my-account'>{EN_STRINGS['Navbar.MyAccount']}</Link>
      </div>
    </div>
  );
};

export default Navbar;
