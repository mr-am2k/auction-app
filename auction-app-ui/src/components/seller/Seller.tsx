import { useEffect, useState } from 'react';

import { usePage } from 'hooks/usePage';

import productsService from 'services/productService';

import ItemList from 'components/UI/item-list/ItemList';
import EmptyCart from 'components/UI/empty-cart/EmptyCart';
import CartIcon from 'assets/icons/CartIcon';
import { Item } from 'models/item';
import { ROUTES } from 'util/routes';
import EN_STRINGS from 'translation/en';

import classNames from 'classnames';
import './seller.scss';

const Seller = () => {
  const [activeProducts, setActiveProducts] = useState<Item[]>([]);
  const [soldProducts, setSoledProducts] = useState<Item[]>([]);
  const [activeDisplay, setActiveDisplay] = useState(true);

  const { setNavbarTitle, setNavbarItems } = usePage();

  const changeOnActive = () => {
    setActiveDisplay(true);
  };

  const changeOnSold = () => {
    setActiveDisplay(false);
  };

  const getProductsForUser = () => {
    productsService.getProductsForUse().then((products) => {
      if (products.length) {
        const currentDate = new Date();

        products.forEach((product) => {
          const productDate = new Date(product.expirationDateTime);

          const newItem: Item = {
            id: product.id,
            imageUrl: product.imageURLs[0],
            name: product.name,
            remainingTime: product.remainingTime,
            price: product.startPrice,
            numberOfBids: product.bids.length,
            highestBid: product.highestBidPrice,
          };

          if (productDate < currentDate) {
            return !soldProducts?.length
              ? setSoledProducts((prevProducts) => [...prevProducts!, newItem])
              : setSoledProducts([newItem]);
          } else {
            return !activeProducts?.length
              ? setActiveProducts((prevProducts) => [...prevProducts!, newItem])
              : setActiveProducts([newItem]);
          }
        });
      }
    });
  };

  useEffect(() => {
    setNavbarTitle(EN_STRINGS.MY_ACCOUNT.SELLER);
    setNavbarItems([
      EN_STRINGS.NAVBAR.MY_ACCOUNT,
      EN_STRINGS.MY_ACCOUNT.SELLER,
    ]);

    getProductsForUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='c-seller-wrapper'>
      <div className='c-seller-options'>
        <div
          onClick={changeOnActive}
          className={classNames({
            'c-seller-option': true,
            'c-seller-option-active': activeDisplay,
          })}
        >
          <p>{EN_STRINGS.SELLER.ACTIVE}</p>
        </div>
        <div
          onClick={changeOnSold}
          className={classNames({
            'c-seller-option': true,
            'c-seller-option-active': !activeDisplay,
          })}
        >
          <p>{EN_STRINGS.SELLER.SOLD}</p>
        </div>
      </div>

      <div className='c-user-products'>
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

          {activeDisplay ? (
            <ItemList
              elements={activeProducts}
              emptyCart={
                <EmptyCart
                  icon={<CartIcon />}
                  message={EN_STRINGS.SELLER.MESSAGE}
                  route={ROUTES.SHOP}
                  buttonMessage={EN_STRINGS.SELLER.BUTTON}
                />
              }
              buttonLabel={EN_STRINGS.SELLER.VIEW}
            />
          ) : (
            <ItemList
              elements={soldProducts}
              expired={true}
              emptyCart={
                <EmptyCart
                  icon={<CartIcon />}
                  message={EN_STRINGS.SELLER.MESSAGE}
                  route={ROUTES.SHOP}
                  buttonMessage={EN_STRINGS.SELLER.BUTTON}
                />
              }
              buttonLabel={EN_STRINGS.SELLER.VIEW}
            />
          )}
        </table>
      </div>
    </div>
  );
};

export default Seller;
