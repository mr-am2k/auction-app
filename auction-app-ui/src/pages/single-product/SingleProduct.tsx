import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { GreaterIcon } from 'assets/icons';
import PageContext from 'store/page-context';
import EN_STRINGS from 'util/en_strings';

import './single-product.scss';
import { Product } from 'models/product';
import productsService from 'services/productService';

const SingleProduct = () => {
  const { setNavbarItems } = useContext(PageContext);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(true); //since there is no user, this should mimic logged in user or guest
  const [singleProduct, setSingleProduct] = useState<Product>();
  const { id } = useParams();

  const otherImages = singleProduct?.imageURL.map((image, index: number) =>
    index !== mainImageIndex ? (
      <img
        src={image}
        alt='slika'
        key={index}
        onClick={() => setMainImageIndex(index)}
      />
    ) : (
      ''
    )
  );

  const fetchSingleProduct = (productId: string) => {
    productsService
      .getSingleProduct(productId)
      .then((data) => {
        setSingleProduct(data);
        setNavbarItems([
          data.name,
          EN_STRINGS['Navbar.Shop'],
          EN_STRINGS['Shop.SingleProduct'],
        ]);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchSingleProduct(id!);
  }, []);
  return (
    <div className='c-single-product'>
      <div className='c-images'>
        <div className='c-main-image'>
          <img src={singleProduct?.imageURL[mainImageIndex]} alt='Main' />
        </div>
        <div className='c-other-images'>{otherImages}</div>
      </div>
      <div className='c-product-info'>
        <h1>{singleProduct?.name}</h1>
        <p>
          {EN_STRINGS['SingleProduct.StartsFrom']}{' '}
          <span>${singleProduct?.price}</span>
        </p>
        <div className='c-bid-container'>
          <div className='c-bid-info'>
            <p>
              {EN_STRINGS['SingleProduct.HighestBid']} <span>$55</span>
            </p>
            <p>
              {EN_STRINGS['SingleProduct.NumberOfBids']} <span>1</span>
            </p>
            <p>
              {EN_STRINGS['SingleProduct.TimeLeft']}{' '}
              <span>10 days 6 weeks</span>
            </p>
          </div>
          <div className='c-send-bid'>
            <input
              type='number'
              placeholder='Enter $56 or higher'
              disabled={!userIsLoggedIn}
            />
            <button disabled={!userIsLoggedIn}>
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
