import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { usePage } from 'hooks/usePage';
import { useUser } from 'hooks/useUser';

import productsService from 'services/productService';
import bidService from 'services/bidService';
import notificationService from 'services/notificationService';
import { storageService } from 'services/storageService';

import { Loading, ImagePicker, NotificationBar, BiddersList, RelatedProducts } from 'components';
import { Product } from 'models/product';
import { Notification } from 'models/notification';
import { createBidRequest } from 'models/request/create/createBidRequest';
import { INPUT_TYPE_NUMBER, LOCAL_STORAGE } from 'util/constants';
import { EN_STRINGS } from 'translation/en';

import './single-product.scss';

import { GreaterIcon } from 'assets/icons';

const SingleProduct = () => {
  const bidInputRef = useRef<HTMLInputElement>(null);
  const [singleProduct, setSingleProduct] = useState<Product>();
  const [highestBid, setHighestBid] = useState<number>();
  const [bidInputError, setBidInputError] = useState<string>();
  const [latestNotification, setLatestNotification] = useState<Notification | undefined>();
  const [inputPlaceholderValue, setInputPlaceholderValue] = useState(0);

  const { setNavbarTitle, setNavbarItems } = usePage();
  const { loggedInUser, isUserLoggedIn } = useUser();
  const { id } = useParams();

  const currentDate = new Date();
  const biddingDisabled = !isUserLoggedIn() || storageService.get(LOCAL_STORAGE.ID) === singleProduct?.user.id;

  const fetchSingleProduct = async (productId: string) => {
    const product = await productsService.getSingleProduct(productId);
    setNavbarTitle([product.name]);
    setNavbarItems([EN_STRINGS.NAVBAR.SHOP, EN_STRINGS.SHOP.SINGLE_PRODUCT]);
    setSingleProduct(product);

    if (!product.bids.length) {
      setInputPlaceholderValue(product.startPrice);
    }
  };

  const fetchHighestBid = async (productId: string) => {
    const highestBid = await bidService.getHighestBid(productId);
    setHighestBid(highestBid);
    setInputPlaceholderValue(highestBid);
  };

  const sendBid = () => {
    const bidInputPrice = bidInputRef.current!.value;

    if (!bidInputPrice) {
      setBidInputError(EN_STRINGS.SINGLE_PRODUCT.INPUT_BID_ERROR);
      return;
    }

    const createBidRequest: createBidRequest = {
      price: Number(bidInputPrice),
      productId: singleProduct!.id,
      userId: loggedInUser!.id,
    };

    setBidInputError('');

    bidService
      .addBid(createBidRequest, singleProduct!.id)
      .then(() => {
        bidInputRef.current!.value = '';
        fetchSingleProduct(id!);
        fetchHighestBid(id!);
      })
      .catch(error => {
        setBidInputError(error.response.data.message);
      });
  };

  const getLatestNotification = (userId: string, productId: string) => {
    notificationService.getLatestNotification(userId, productId).then(latestNotification => setLatestNotification(latestNotification));
  };

  const initialLoad = async () => {
    fetchSingleProduct(id!);
    fetchHighestBid(id!);
  };

  useEffect(() => {
    initialLoad();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loggedInUser ? getLatestNotification(loggedInUser!.id, id!) : setLatestNotification(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser, singleProduct]);

  useEffect(() => {
    fetchSingleProduct(id!)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!singleProduct) {
    return <Loading />;
  }

  return (
    <>
      {latestNotification && <NotificationBar notificationMessage={latestNotification!.type} />}

      <div className='c-single-product'>
        <ImagePicker images={singleProduct.imageURLs} />

        <div className='c-product-info'>
          <h1>{singleProduct?.name}</h1>
          <p>
            {`${EN_STRINGS.SINGLE_PRODUCT.STARTS_FROM}: `}
            <span>${singleProduct?.startPrice}</span>
          </p>

          <div className='c-bid-container'>
            {highestBid ? (
              <div className='c-bid-info'>
                <p>
                  {`${EN_STRINGS.SINGLE_PRODUCT.HIGHEST_BID}: `}
                  <span>${highestBid}</span>
                </p>
                <p>
                  {`${EN_STRINGS.SINGLE_PRODUCT.NUMBER_OF_BIDS}: `}
                  <span>{singleProduct.bids.length}</span>
                </p>
                <p>
                  {`${EN_STRINGS.SINGLE_PRODUCT.TIME_LEFT}: `}
                  <span>
                    {new Date(singleProduct.expirationDateTime) < currentDate
                      ? EN_STRINGS.SINGLE_PRODUCT.EXPIRED
                      : singleProduct.remainingTime}
                  </span>
                </p>
              </div>
            ) : (
              <h3>{EN_STRINGS.SINGLE_PRODUCT.NO_BID_MESSAGE}</h3>
            )}

            <div className='c-send-bid'>
              {new Date(singleProduct.expirationDateTime) < currentDate ? (
                singleProduct.highestBidder === storageService.get('id') ? (
                  <Link to='/'>
                    <button>{EN_STRINGS.SINGLE_PRODUCT.PAY}</button>
                  </Link>
                ) : (
                  <p className='c-lost-message'>{EN_STRINGS.SINGLE_PRODUCT.LOST_MESSAGE}</p>
                )
              ) : (
                <>
                  <input
                    ref={bidInputRef}
                    type={INPUT_TYPE_NUMBER}
                    placeholder={`${EN_STRINGS.SINGLE_PRODUCT.INPUT_PLACEHOLDER}${inputPlaceholderValue}`}
                    disabled={biddingDisabled}
                  />
                  <button disabled={biddingDisabled} onClick={sendBid}>
                    {EN_STRINGS.SINGLE_PRODUCT.PLACE_BID} <GreaterIcon />
                  </button>
                </>
              )}
            </div>

            {bidInputError?.length ? (
              <div className='c-bid-error'>
                <p>{bidInputError}</p>
              </div>
            ) : null}
          </div>

          <div className='c-details'>
            <div className='c-navbar'>
              <p className='c-navbar-item c-focus'>{EN_STRINGS.SINGLE_PRODUCT.DETAILS}</p>
              <p className='c-navbar-item'>{EN_STRINGS.SINGLE_PRODUCT.SELLER_INFORMATION}</p>
              <p className='c-navbar-item'>{EN_STRINGS.SINGLE_PRODUCT.CUSTOM_REVIEWS}</p>
            </div>

            <div className='c-details-description'>
              <p>{singleProduct?.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='c-additional-info'>
        {storageService.get(LOCAL_STORAGE.ID) === singleProduct.user.id ? (
          <BiddersList productId={singleProduct.id} />
        ) : (
          <RelatedProducts categoryId={singleProduct.category.id} productId={singleProduct.id} />
        )}
      </div>
    </>
  );
};

export default SingleProduct;
