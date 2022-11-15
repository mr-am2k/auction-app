import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Product } from 'models/product';
import EN_STRINGS from 'util/en_strings';
import productsService from 'services/productService';
import { usePage } from 'hooks/usePage';
import { useUser } from 'hooks/useUser';
import { Bid } from 'models/bid';

import { GreaterIcon } from 'assets/icons';
import { Loading } from 'components';
import ImagePicker from 'components/image-picker/ImagePicker';
import './single-product.scss';

const SingleProduct = () => {
  const { setNavbarItems } = usePage();
  const { loggedInUser, isUserLoggedIn } = useUser();
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState<Product>();
  const [highestBid, setHighestBid] = useState<Bid | null>();

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
        setHighestBid(getHighestBid(product));
      })
      .catch((error) => console.log(error));
  };

  const getHighestBid = (product: Product) => {
    let minPrice = 0;
    let highestBid: Bid | null = null;
    product?.bids.forEach((bid) => {
      if (bid.bidPrice > minPrice) {
        highestBid = bid;
        minPrice = bid.bidPrice;
      }
    });
    return highestBid;
  };

  useEffect(() => {
    fetchSingleProduct(id!);
  }, []);

  if (!singleProduct) {
    return <Loading />;
  }

  console.log(loggedInUser);
  console.log(isUserLoggedIn());
  return (
    <div className='c-single-product'>
      <ImagePicker images={singleProduct.imageURL} />

      <div className='c-product-info'>
        <h1>{singleProduct?.name}</h1>
        <p>
          {EN_STRINGS['SingleProduct.StartsFrom']}{' '}
          <span>${singleProduct?.price}</span>
        </p>

        <div className='c-bid-container'>
          {highestBid && (
            <div className='c-bid-info'>
              <p>
                {EN_STRINGS['SingleProduct.HighestBid']}{' '}
                <span>${highestBid?.bidPrice}</span>
              </p>
              <p>
                {EN_STRINGS['SingleProduct.NumberOfBids']}{' '}
                <span>{singleProduct.bids.length}</span>
              </p>
              <p>
                {EN_STRINGS['SingleProduct.TimeLeft']} <span>{}</span>
              </p>
            </div>
          )}

          {!highestBid && <h3>{EN_STRINGS['SingleProduct.NoBidMessage']}</h3>}

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
