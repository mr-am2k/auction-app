import { Link } from 'react-router-dom';
import React, { useState } from 'react';

import auctionAppLogo from 'assets/logo/auction-app-logo.svg';
import { SearchIcon, CloseIcon } from 'assets/icons';
import './navbar.scss';

const Navbar = () => {
  const [inputContent, setInputContent] = useState('');
  const searchHandler = () => {
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
          {inputContent.length !== 0 && (
            <span onClick={() => setInputContent('')}>
              <CloseIcon />
            </span>
          )}
          <span onClick={searchHandler}>
            <SearchIcon />
          </span>
        </div>
      </div>
      <div className='c-navbar-options'>
        <Link to='/'>HOME</Link>
        <Link to='/shop'>SHOP</Link>
        <Link to='/my-account'>MY ACCOUNT</Link>
      </div>
    </div>
  );
};

export default Navbar;
