import { usePage } from 'hooks/usePage';

import './navbar-tracker.scss';

import { ArrowIcon } from 'assets/icons';

const NavbarTracker = () => {
  const { navbarTitle, navbarItems } = usePage();

  if (!navbarItems.length) {
    return <div className='c-empty-div'></div>;
  }

  // eslint-disable-next-line array-callback-return
  const listOfPaths = navbarItems.map(function (item, index: number) {
    if (index + 1 === navbarItems.length && index !== 0) {
      return (
        <span className='c-last-item c-path-item' key={index}>
          <ArrowIcon />
          {item}
        </span>
      );
    }

    if (index > 0 && index < navbarItems.length) {
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
      {navbarTitle.length ? <div className='c-current-page'>{navbarTitle[0]}</div> : null}
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
