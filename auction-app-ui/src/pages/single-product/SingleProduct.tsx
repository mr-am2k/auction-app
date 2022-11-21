import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

import { usePage } from 'hooks/usePage';
import { useUser } from 'hooks/useUser';

import productsService from 'services/productService';
import bidService from 'services/bidService';

import { Loading, ImagePicker } from 'components';
import { requestBid } from 'requestModels/requestBid';
import { GreaterIcon } from 'assets/icons';
import { Product } from 'models/product';
import EN_STRINGS from 'util/en_strings';

import './single-product.scss';

//used for testing, will be removed when we create real users
const USER_ID_1 = '94dd5b8d-49eb-4c92-827f-022a2dfb868f';

const USER_ID_2 = '16065605-eca3-4d16-8eb0-93368fbf5841';

const SingleProduct = () => {
  const { setNavbarItems } = usePage();
  const { isUserLoggedIn } = useUser();
  const { id } = useParams();
  const bidInputRef = useRef<HTMLInputElement>(null);
  const [singleProduct, setSingleProduct] = useState<Product>();
  const [highestBid, setHighestBid] = useState<number>();
  const [bidInputError, setBidInputError] = useState<string>();

  const fetchSingleProduct = async (productId: string) => {
    try {
      const product = await productsService.getSingleProduct(productId);
      setNavbarItems([
        product.name,
        EN_STRINGS['Navbar.Shop'],
        EN_STRINGS['Shop.SingleProduct'],
      ]);
      setSingleProduct(product);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchHighestBid = async (productId: string) => {
    try {
      const highestBid = await bidService.getHighestBid(productId);
      setHighestBid(highestBid);
    } catch (error) {
      console.log(error);
    }
  };

  const sendBid = () => {
    const bidInputPrice = bidInputRef.current!.value;

    if (!bidInputPrice) {
      setBidInputError('You must enter price first');
      return;
    }

    const createBidRequest: requestBid = {
      price: Number(bidInputPrice),
      productId: singleProduct!.id,
      userId: USER_ID_2,
    };
    bidService
      .addBid(createBidRequest)
      .then(() => setBidInputError(''))
      .catch((error) => { console.log(error) 
        console.log(createBidRequest);
        setBidInputError(error.response.data.message)});
  };

  const initialLoad = async () => {
    fetchSingleProduct(id!);
    fetchHighestBid(id!);
  };

  useEffect(() => {
    initialLoad();
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
                <span>{singleProduct.remainingTime}</span>
              </p>
            </div>
          ) : (
            <h3>{EN_STRINGS['SingleProduct.NoBidMessage']}</h3>
          )}

          <div className='c-send-bid'>
            <input
              ref={bidInputRef}
              type='number'
              placeholder={EN_STRINGS['SingleProduct.InputPlaceholder']}
              disabled={!isUserLoggedIn()}
            />
            <button disabled={!isUserLoggedIn()} onClick={sendBid}>
              {EN_STRINGS['SingleProduct.PlaceBid']} <GreaterIcon />
            </button>
          </div>

          {bidInputError?.length ? (
            <div className='c-bid-error'>
              <p>{bidInputError}</p>
            </div>
          ) : (
            ''
          )}
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
