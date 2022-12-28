import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { usePage } from 'hooks/usePage';

import { ROUTES } from 'util/routes';
import { AiOutlineHeart } from 'react-icons/ai';
import EN_STRINGS from 'translation/en';

import './wishlist.scss';

const Wishlist = () => {
  const { setNavbarTitle, setNavbarItems } = usePage();

  useEffect(() => {
    setNavbarTitle(EN_STRINGS.MY_ACCOUNT.WISHLIST);
    setNavbarItems([
      EN_STRINGS.NAVBAR.MY_ACCOUNT,
      EN_STRINGS.MY_ACCOUNT.WISHLIST,
    ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='c-wishlist-wrapper'>
      <table>
        <thead>
          <tr>
            <td>{EN_STRINGS.TABLE.ITEM}</td>
            <td>{EN_STRINGS.TABLE.NAME}</td>
            <td>{EN_STRINGS.TABLE.TIME_LEFT}</td>
            <td>{EN_STRINGS.TABLE.YOUR_PRICE}</td>
            <td>{EN_STRINGS.TABLE.NUMBER_OF_BIDS}</td>
            <td>{EN_STRINGS.TABLE.HIGHEST_BID}</td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td colSpan={6}>
              <div className='c-empty-wishlist'>
                <AiOutlineHeart className='c-wishlist-icon' />

                <p>{EN_STRINGS.WISHLIST.MESSAGE}</p>

                <Link to={ROUTES.SHOP}>
                  <button>{EN_STRINGS.WISHLIST.BUTTON}</button>
                </Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Wishlist;
