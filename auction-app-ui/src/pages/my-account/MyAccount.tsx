import { useEffect, useState } from 'react';

import { Profile, Seller, Bids, Wishlist, Settings } from 'components';
import { ProfileIcon, SellerIcon, BidIcon } from 'assets/icons';
import { AiOutlineHeart } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import EN_STRINGS from 'translation/en';

import './my-account.scss';

import classNames from 'classnames';

type Props = {
  children?: React.ReactNode;
  pages: any[];
};

const MyAccount = () => {
  const [navbarElements, setNavbarElements] = useState([
    {
      page: <Profile />,
      icon: <ProfileIcon />,
      name: EN_STRINGS.MY_ACCOUNT.PROFILE,
      focused: true,
    },
    {
      page: <Seller />,
      icon: <SellerIcon />,
      name: EN_STRINGS.MY_ACCOUNT.SELLER,
      focused: false,
    },
    {
      page: <Bids />,
      icon: <BidIcon />,
      name: EN_STRINGS.MY_ACCOUNT.BIDS,
      focused: false,
    },
    {
      page: <Wishlist />,
      icon: <AiOutlineHeart className='c-icon-style' />,
      name: EN_STRINGS.MY_ACCOUNT.WISHLIST,
      focused: false,
    },
    {
      page: <Settings />,
      icon: <CiSettings className='c-icon-style' />,
      name: EN_STRINGS.MY_ACCOUNT.SETTINGS,
      focused: false,
    },
  ]);
  const [page, setPage] = useState<JSX.Element>();

  const changeActivePage = (i: number) => {
    const newState = navbarElements.map((element, index) => {
      if (index === i) {
        setPage(element.page);
        return { ...element, focused: true };
      }
      return { ...element, focused: false };
    });
    setNavbarElements(newState);
  };

  const NavbarElement: React.FC<Props> = ({ pages }) => {
    return (
      <>
        {pages.map((page, index) => (
          <div
            onClick={() => changeActivePage(index)}
            className={classNames({
              'c-navbar-element': true,
              'c-navbar-element-focused': page.focused,
            })}
            key={index}
          >
            <div className='c-page-icon'>{page.icon}</div>
            <p>{page.name}</p>
          </div>
        ))}
      </>
    );
  };

  useEffect(() => {
    setPage(<Profile />);
  }, []);

  return (
    <div className='c-my-account-wrapper'>
      <div className='c-my-account-navbar'>
        <NavbarElement pages={navbarElements} />
      </div>
      <div>{page}</div>
    </div>
  );
};

export default MyAccount;
