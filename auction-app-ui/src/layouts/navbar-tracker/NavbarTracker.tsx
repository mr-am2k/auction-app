import { useContext } from 'react';
import PageContext from 'store/page-context';

import { ArrowIcon } from 'assets/icons';
import './navbar-tracker.scss';

const NavbarTracker = () => {
  const { navbarItems } = useContext(PageContext);

  if (!navbarItems.length) {
    return <div className='c-empty-div'></div>;
  }

  // eslint-disable-next-line array-callback-return
  const listOfPaths = navbarItems.map(function (item, index: number) {
    if (index + 1 === navbarItems.length) {
      return (
        <span className='c-last-item c-path-item' key={index}>
          <ArrowIcon />
          {item}
        </span>
      );
    }

    if (index > 1 && index < navbarItems.length) {
      return (
        <span key={index} className='c-path-item'>
          <ArrowIcon />
          {item}
        </span>
      );
    }
  });

  return (
    <div className='c-navbar-tracker'>
      <div className='c-current-page'>{navbarItems[0]}</div>
      <div className='c-page-path'>
        <>
          <span className='c-path-item'>{navbarItems[1]}</span>
          {listOfPaths}
        </>
      </div>
    </div>
  );
};

export default NavbarTracker;
