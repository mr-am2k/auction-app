import { useEffect, useState } from 'react';

import { usePage } from 'hooks/usePage';

import productsService from 'services/productService';
import { storageService } from 'services/storageService';

import { ItemList, EmptyList } from '../index';
import CartIcon from 'assets/icons/CartIcon';
import { ProductList } from 'models/productList';
import { LOCAL_STORAGE } from 'util/constants';
import { ROUTES } from 'util/routes';
import EN_STRINGS from 'translation/en';

import './seller-details.scss';

import classNames from 'classnames';

const SellerDetails = () => {
  const [activeProducts, setActiveProducts] = useState<ProductList[]>([]);
  const [soldProducts, setSoledProducts] = useState<ProductList[]>([]);
  const [activeProductsDisplayed, setActiveProductsDisplayed] = useState(true);

  const { setNavbarTitle, setNavbarItems } = usePage();

  const changeOnActive = () => {
    setActiveProductsDisplayed(true);
  };

  const changeOnSold = () => {
    setActiveProductsDisplayed(false);
  };

  const getProductsForUser = () => {
    productsService
      .getUserProducts(storageService.get(LOCAL_STORAGE.ID)!)
      .then((products) => {
        if (products.length) {
          const currentDate = new Date();

          products.forEach((product) => {
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
              return !soldProducts?.length
                ? setSoledProducts((prevProducts) => [
                    ...prevProducts!,
                    newProduct,
                  ])
                : setSoledProducts([newProduct]);
            } else {
              return !activeProducts?.length
                ? setActiveProducts((prevProducts) => [
                    ...prevProducts!,
                    newProduct,
                  ])
                : setActiveProducts([newProduct]);
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
            'c-seller-option--active': activeProductsDisplayed,
          })}
        >
          <p>{EN_STRINGS.SELLER.ACTIVE}</p>
        </div>
        <div
          onClick={changeOnSold}
          className={classNames({
            'c-seller-option': true,
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
              <td>{EN_STRINGS.PRODUCTS_TABLE.ITEM}</td>
              <td>{EN_STRINGS.PRODUCTS_TABLE.NAME}</td>
              <td>{EN_STRINGS.PRODUCTS_TABLE.TIME_LEFT}</td>
              <td>{EN_STRINGS.PRODUCTS_TABLE.YOUR_PRICE}</td>
              <td>{EN_STRINGS.PRODUCTS_TABLE.NUMBER_OF_BIDS}</td>
              <td>{EN_STRINGS.PRODUCTS_TABLE.HIGHEST_BID}</td>
            </tr>
          </thead>

          {activeProductsDisplayed ? (
            <ItemList
              elements={activeProducts}
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
