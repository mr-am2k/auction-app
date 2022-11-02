import { useContext } from 'react';
import PageContext from 'store/page-context';

import { ArrowIcon } from 'assets/icons';
import './navbar-tracker.scss';

const NavbarTracker = () => {
  const { navbarItems } = useContext(PageContext);

  const listOfPaths = navbarItems.map(function (word, index: number) {
    if (index + 1 !== navbarItems.length && index !== 0) {
      return (
        <span key={index} className='c-path-item'>
          <ArrowIcon />
          {word}
        </span>
      );
    }

    if (index + 1 === navbarItems.length) {
      return (
        <span className='c-last-item c-path-item' key={index}>
          <ArrowIcon />
          {word}{' '}
        </span>
      );
    }
  });

  if (!navbarItems.length) {
    return <div className='c-empty-div'></div>;
  }

  return (
    <div className='c-navbar-tracker'>
      <div className='c-current-page'>{navbarItems[0]}</div>
      <div className='c-page-path'>
        <>
          <span className='c-path-item'>{navbarItems[0]}</span>
          {listOfPaths}
        </>
      </div>
    </div>
  );
};

export default NavbarTracker;
