import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Product } from 'models/product';
import PageContext from 'store/page-context/page-context';
import EN_STRINGS from 'util/en_strings';
import productsService from 'services/productService';

import { GreaterIcon } from 'assets/icons';
import { Loading } from 'components';
import './single-product.scss';
import UserContext from 'store/user-context/user-context';
import ImagePicker from 'components/image-picker/ImagePicker';
import { Bid } from 'models/bid';

const SingleProduct = () => {
  const { setNavbarItems } = useContext(PageContext);
  const { loggedInUser } = useContext(UserContext);
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState<Product>();
  const [highestBid, setHighestBid] = useState<Bid | null>();

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
        setHighestBid(getHighestBid(data));
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

  return (
    <div className='c-single-product'>
      <ImagePicker singleProduct={singleProduct} />

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

          {!highestBid && <h3>Be first to bid for this product</h3>}

          <div className='c-send-bid'>
            <input
              type='number'
              placeholder='Enter $56 or higher'
              disabled={!loggedInUser}
            />
            <button disabled={!loggedInUser}>
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
