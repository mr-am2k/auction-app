import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { usePage } from 'hooks/usePage';

import bidService from 'services/bidService';

import { BidWithProduct } from 'models/bidWithProduct';
import { ROUTES } from 'util/routes';
import HammerIcon from 'assets/icons/HammerIcon';
import EN_STRINGS from 'translation/en';

import './bids.scss';

const Bids = () => {
  const { setNavbarTitle, setNavbarItems } = usePage();

  const [bids, setBids] = useState<BidWithProduct[]>();

  const fetchBidsForUser = () => {
    bidService.getBidsForUser().then((bids) => {
      setBids(bids);
    });
  };

  useEffect(() => {
    setNavbarTitle(EN_STRINGS.MY_ACCOUNT.BIDS);
    setNavbarItems([EN_STRINGS.NAVBAR.MY_ACCOUNT, EN_STRINGS.MY_ACCOUNT.BIDS]);

    fetchBidsForUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='c-bids-wrapper'>
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
          {bids?.length ? (
            bids?.map((bid, index) => (
              <tr key={index}>
                <td>
                  <img src={bid.product.imageURLs[0]} alt='Product' />
                </td>
                <td>{bid.product.name}</td>
                <td>{bid.product.remainingTime}</td>
                <td>${bid.price.toFixed(2)}</td>
                <td>{bid.product.numberOfBids}</td>
                <td>${bid.product.highestBid?.toFixed(2)}</td>
                <td>
                  <Link to={`${ROUTES.PRODUCT}/${bid.product.id}`}>
                    <button>{EN_STRINGS.BIDS.BID}</button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>
                <div className='c-empty-bids'>
                  <HammerIcon />

                  <p>{EN_STRINGS.BIDS.MESSAGE}</p>

                  <Link to={ROUTES.SHOP}>
                    <button>{EN_STRINGS.BIDS.BUTTON}</button>
                  </Link>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Bids;
