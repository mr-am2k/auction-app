import { useEffect, useState } from 'react';

import { usePage } from 'hooks/usePage';

import productsService from 'services/productService';
import { storageService } from 'services/storageService';

import { ItemList, EmptyList } from '../index';
import { ProductList } from 'models/productList';
import { LOCAL_STORAGE } from 'util/constants';
import { ROUTES } from 'util/routes';
import { EN_STRINGS, PRODUCTS_TABLE } from 'translation/en';

import './seller-details.scss';

import CartIcon from 'assets/icons/CartIcon';

import classNames from 'classnames';

const SellerDetails = () => {
  const [activeProducts, setActiveProducts] = useState<ProductList[]>([]);
  const [soldProducts, setSoldProducts] = useState<ProductList[]>([]);
  const [activeProductsDisplayed, setActiveProductsDisplayed] = useState(true);

  const { setNavbarTitle, setNavbarItems } = usePage();

  const getProductsForUser = () => {
    productsService.getUserProducts(storageService.get(LOCAL_STORAGE.ID)!).then(products => {
      if (products.length) {
        const currentDate = new Date();

        products.forEach(product => {
          const productDate = new Date(product.expirationDateTime);

          const newProduct: ProductList = {
            id: product.id,
            imageUrl: product.imageURLs[0],
            name: product.name,
            remainingTime: product.remainingTime,
            price: product.startPrice,
            numberOfBids: product.bids.length,
            highestBid: product.highestBidPrice,
          };

          if (productDate < currentDate) {
            return !soldProducts?.length ? setSoldProducts(soldProducts => [...soldProducts!, newProduct]) : setSoldProducts([newProduct]);
          } else {
            return !activeProducts?.length ?
              setActiveProducts(activeProducts => [...activeProducts!, newProduct]) :
              setActiveProducts([newProduct]);
          }
        });
      }
    });
  };

  useEffect(() => {
    setNavbarTitle(EN_STRINGS.MY_ACCOUNT.SELLER);
    setNavbarItems([EN_STRINGS.NAVBAR.MY_ACCOUNT, EN_STRINGS.MY_ACCOUNT.SELLER]);

    getProductsForUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='c-seller-wrapper'>
      <div className='c-seller-options'>
        <div
          onClick={() => setActiveProductsDisplayed(true)}
          className={classNames('c-seller-option', {
            'c-seller-option--active': activeProductsDisplayed,
          })}
        >
          <p>{EN_STRINGS.SELLER.ACTIVE}</p>
        </div>
        <div
          onClick={() => setActiveProductsDisplayed(false)}
          className={classNames('c-seller-option', {
            'c-seller-option--active': !activeProductsDisplayed,
          })}
        >
          <p>{EN_STRINGS.SELLER.SOLD}</p>
        </div>
      </div>

      <div className='c-user-products'>
        <table>
          <thead>
            <tr>
              <td>{PRODUCTS_TABLE.ITEM}</td>
              <td>{PRODUCTS_TABLE.NAME}</td>
              <td>{PRODUCTS_TABLE.TIME_LEFT}</td>
              <td>{PRODUCTS_TABLE.START_PRICE}</td>
              <td>{PRODUCTS_TABLE.NUMBER_OF_BIDS}</td>
              <td>{PRODUCTS_TABLE.HIGHEST_BID}</td>
            </tr>
          </thead>

          {activeProductsDisplayed ? (
            <ItemList
              elements={activeProducts}
              emptyList={
                <EmptyList
                  icon={<CartIcon />}
                  message={EN_STRINGS.SELLER.MESSAGE}
                  route={`${ROUTES.MY_ACCOUNT}${ROUTES.ADD_PRODUCT}`}
                  buttonLabel={EN_STRINGS.SELLER.BUTTON}
                />
              }
              buttonLabel={EN_STRINGS.SELLER.VIEW}
            />
          ) : (
            <ItemList
              elements={soldProducts}
              expired={true}
              emptyList={
                <EmptyList
                  icon={<CartIcon />}
                  message={EN_STRINGS.SELLER.MESSAGE}
                  route={ROUTES.SHOP}
                  buttonLabel={EN_STRINGS.SELLER.BUTTON}
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

export default SellerDetails;
