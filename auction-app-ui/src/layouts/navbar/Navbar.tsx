import auctionAppLogo from '../../assets/logo/auctionAppLogo.png';
import searchIcon from '../../assets/icons/searchIcon.png';
import xIcon from '../../assets/icons/xIcon.png';
import classes from './Navbar.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [inputContent, setInputContent] = useState('');
  const searchHandler = () => {
    console.log(inputContent);
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.appLogo}>
        <img src={auctionAppLogo} alt='Auction App' />
      </div>
      <div className={classes.searchField}>
        <input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setInputContent(event.target.value)
          }
          type='text'
          placeholder='Try enter: Shoes'
          value={inputContent}
        />
        <div className={classes.searchInputIcons}>
          {inputContent.length !== 0 && (
            <img src={xIcon} alt='Close' onClick={() => setInputContent('')} />
          )}
          <img src={searchIcon} alt='Search' onClick={searchHandler} />
        </div>
      </div>
      <div className={classes.navbarOptions}>
        <Link to='/'>HOME</Link>
        <Link to='/shop'>SHOP</Link>
        <Link to='/my-account'>MY ACCOUNT</Link>
      </div>
    </div>
  );
};

export default Navbar;
