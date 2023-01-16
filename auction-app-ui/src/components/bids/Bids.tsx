import {useEffect, useState} from 'react';

import {usePage} from 'hooks/usePage';

import bidService from 'services/bidService';
import productsService from 'services/productService';
import {storageService} from 'services/storageService';

import {ItemList, EmptyList} from '../index';
import {ProductList} from 'models/productList';
import {Bid} from 'models/bid';
import {ROUTES} from 'util/routes';
import {LOCAL_STORAGE} from 'util/constants';
import {EN_STRINGS, PRODUCTS_TABLE} from 'translation/en';

import './bids.scss';

import HammerIcon from 'assets/icons/HammerIcon';

const Bids = () => {
  const [bids, setBids] = useState<ProductList[]>([]);
  const {setNavbarTitle, setNavbarItems} = usePage();

  const fetchUserBids = () => {
    let bids: Bid[];

    bidService
      .getUserBids(storageService.get(LOCAL_STORAGE.ID)!)
      .then((fetchedBids) => {
        bids = fetchedBids;

        const productPromises = fetchedBids.map((bid) =>
          productsService.getSingleProduct(bid.productId)
        );

        return Promise.all(productPromises);
      })
      .then((products) => {
        const updatedProducts = products.map((product, index) => {
          const bid = bids[index];

          return {
            id: bid.productId,
            imageUrl: product.imageURLs[0],
            name: product.name,
            remainingTime: product.remainingTime,
            price: bid.price,
            numberOfBids: product.bids.length,
            highestBid: product.highestBidPrice,
          };
        });

        setBids((products) => [...products, ...updatedProducts]);
      });
  };

  useEffect(() => {
    setNavbarTitle(EN_STRINGS.MY_ACCOUNT.BIDS);
    setNavbarItems([EN_STRINGS.NAVBAR.MY_ACCOUNT, EN_STRINGS.MY_ACCOUNT.BIDS]);

    fetchUserBids();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="c-bids-wrapper">
      <table>
        <thead>
          <tr>
            <td>{PRODUCTS_TABLE.ITEM}</td>
            <td>{PRODUCTS_TABLE.NAME}</td>
            <td>{PRODUCTS_TABLE.TIME_LEFT}</td>
            <td>{PRODUCTS_TABLE.YOUR_PRICE}</td>
            <td>{PRODUCTS_TABLE.NUMBER_OF_BIDS}</td>
            <td>{PRODUCTS_TABLE.HIGHEST_BID}</td>
          </tr>
        </thead>

        <ItemList
          elements={bids}
          emptyList={
            <EmptyList
              icon={<HammerIcon />}
              message={EN_STRINGS.BIDS.MESSAGE}
              route={ROUTES.SHOP}
              buttonLabel={EN_STRINGS.BIDS.BUTTON}
            />
          }
          buttonLabel={EN_STRINGS.BIDS.BID}
        />
      </table>
    </div>
  );
};

export default Bids;
