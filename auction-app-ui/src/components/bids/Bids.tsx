import { useEffect, useState } from 'react';

import { usePage } from 'hooks/usePage';

import bidService from 'services/bidService';

import ItemList from 'components/UI/item-list/ItemList';
import EmptyCart from 'components/UI/empty-cart/EmptyCart';
import { ROUTES } from 'util/routes';
import { Item } from 'models/item';
import HammerIcon from 'assets/icons/HammerIcon';
import EN_STRINGS from 'translation/en';

import './bids.scss';

const Bids = () => {
  const { setNavbarTitle, setNavbarItems } = usePage();

  const [bids, setBids] = useState<Item[]>([]);

  const fetchBidsForUser = () => {
    bidService.getBidsForUser().then((bids) => {
      bids.forEach((bid) => {
        const newItem: Item = {
          id: bid.product.id,
          imageUrl: bid.product.imageURLs[0],
          name: bid.product.name,
          remainingTime: bid.product.remainingTime,
          price: bid.price,
          numberOfBids: bid.product.numberOfBids,
          highestBid: bid.product.highestBid,
        };

        setBids((prevValues) => [...prevValues, newItem]);
      });
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

        <ItemList
          elements={bids}
          emptyCart={
            <EmptyCart
              icon={<HammerIcon />}
              message={EN_STRINGS.BIDS.MESSAGE}
              route={ROUTES.SHOP}
              buttonMessage={EN_STRINGS.BIDS.BUTTON}
            />
          }
          buttonLabel={EN_STRINGS.BIDS.BID}
        />
      </table>
    </div>
  );
};

export default Bids;
