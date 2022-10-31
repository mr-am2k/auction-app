import auctionAppLogo from '../../assets/logo/auctionAppLogo.png';
import search from '../../assets/icons/search.png';
import xIcon from '../../assets/icons/xIcon.png';
import classes from './Navbar.module.css';
import { useState } from 'react';
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
          onChange={(event: any) => setInputContent(event.target.value)}
          type='text'
          placeholder='Try enter: Shoes'
          value={inputContent}
        />
        <div className={classes.searchInputIcons}>
          {inputContent.length !== 0 && (
            <img src={xIcon} alt='Close' onClick={() => setInputContent('')} />
          )}
          <img src={search} alt='Search' onClick={searchHandler} />
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
