import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { usePage } from 'hooks/usePage';
import { useUser } from 'hooks/useUser';

import productsService from 'services/productService';
import bidService from 'services/bidService';

import { Loading, ImagePicker } from 'components';
import { GreaterIcon } from 'assets/icons';
import { Product } from 'models/product';
import { dateDiff } from 'util/date_diff';
import EN_STRINGS from 'util/en_strings';

import './single-product.scss';

const SingleProduct = () => {
  const { setNavbarItems } = usePage();
  const { isUserLoggedIn } = useUser();
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState<Product>();
  const [bidExpirationTime, setBidExpirationTime] = useState<string | number>();
  const [highestBid, setHighestBid] = useState<any>();

  const fetchSingleProduct = (productId: string) => {
    productsService
      .getSingleProduct(productId)
      .then((product) => {
        setSingleProduct(product);
        setNavbarItems([
          product.name,
          EN_STRINGS['Navbar.Shop'],
          EN_STRINGS['Shop.SingleProduct'],
        ]);
        bidService
          .getHighestBid(product.id)
          .then((topBid) => setHighestBid(topBid));
        setBidExpirationTime(dateDiff(product.expirationDateTime));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchSingleProduct(id!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!singleProduct) {
    return <Loading />;
  }

  return (
    <div className='c-single-product'>
      <ImagePicker images={singleProduct.imageURL} />

      <div className='c-product-info'>
        <h1>{singleProduct?.name}</h1>
        <p>
          {EN_STRINGS['SingleProduct.StartsFrom']}:{' '}
          <span>${singleProduct?.price}</span>
        </p>

        <div className='c-bid-container'>
          {highestBid ? (
            <div className='c-bid-info'>
              <p>
                {EN_STRINGS['SingleProduct.HighestBid']}:{' '}
                <span>${highestBid}</span>
              </p>
              <p>
                {EN_STRINGS['SingleProduct.NumberOfBids']}:{' '}
                <span>{singleProduct.bids.length}</span>
              </p>
              <p>
                {EN_STRINGS['SingleProduct.TimeLeft']}:{' '}
                <span>{bidExpirationTime}</span>
              </p>
            </div>
          ) : (
            <h3>{EN_STRINGS['SingleProduct.NoBidMessage']}</h3>
          )}

          <div className='c-send-bid'>
            <input
              type='number'
              placeholder={EN_STRINGS['SingleProduct.InputPlaceholder']}
              disabled={!isUserLoggedIn()}
            />
            <button disabled={!isUserLoggedIn()}>
              {EN_STRINGS['SingleProduct.PlaceBid']} <GreaterIcon />
            </button>
          </div>
        </div>

        <div className='c-details'>
          <div className='c-navbar'>
            <p className='c-navbar-item c-focus'>
              {EN_STRINGS['SingleProduct.Details']}
            </p>
            <p className='c-navbar-item'>
              {EN_STRINGS['SingleProduct.SellerInformation']}
            </p>
            <p className='c-navbar-item'>
              {EN_STRINGS['SingleProduct.CustomReviews']}
            </p>
          </div>

          <div className='c-details-description'>
            <p>{singleProduct?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
