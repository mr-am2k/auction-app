import { useLocation } from 'react-router';
import getPathName from 'util/get_path_name';

import { ArrowIcon } from 'assets/icons';
import './navbar-tracker.scss';

const NavbarTracker = () => {
  const location = useLocation();
  let outputArray: string[] = [];
  if (location.pathname.length) {
    const pathNameArray = location.pathname.split('/');
    outputArray = [...getPathName(pathNameArray)];
  }

  const sizeOfOutputArray = outputArray.length;
  const listOfPaths = outputArray.map(function (word, index: number) {
    if (index + 1 !== sizeOfOutputArray && index !== 0) {
      return (
        <span key={index} className='c-path-item'>
          <ArrowIcon />
          {word}
        </span>
      );
    }
    if (index + 1 === sizeOfOutputArray) {
      return (
        <span className='c-last-item c-path-item' key={index}>
          <ArrowIcon />
          {word}{' '}
        </span>
      );
    }
  });

  if (
    location.pathname === '/' ||
    location.pathname === '/shop' ||
    location.pathname === '/my-account'
  ) {
    return <div className='c-empty-div'></div>;
  }
  return (
    <div className='c-navbar-tracker'>
      <div className='c-current-page'>{outputArray[0]}</div>
      <div className='c-page-path'>
        <>
          <span className='c-path-item'>{outputArray[0]}</span>
          {listOfPaths}
        </>
      </div>
    </div>
  );
};

export default NavbarTracker;
