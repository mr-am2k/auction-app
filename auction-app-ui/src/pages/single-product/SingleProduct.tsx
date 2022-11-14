import { GreaterIcon } from 'assets/icons';
import { Product } from 'models/product';
import { useContext, useEffect } from 'react';
import PageContext from 'store/page-context';
import EN_STRINGS from 'util/en_strings';

import './single-product.scss';

const mockProduct: Product = {
  id: '12312312djklfjklfj3',
  name: 'BIYLACLESEN Womens 3-in-1 Snowboard Jacket Winter Coats',
  description:
    'Note: The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm. Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside. Zippered Hand Pockets and Hidden Pocket keep your things secure.  Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates',
  imageURL: 'test.jpg',
  price: 52,
  creationDate: new Date(),
  expirationDate: new Date(),
};

const SingleProduct = () => {
  const { setNavbarItems } = useContext(PageContext);

  useEffect(() => {
    setNavbarItems([
      mockProduct.name,
      EN_STRINGS['Navbar.Shop'],
      EN_STRINGS['Shop.SingleProduct'],
    ]);
  }, []);
  return (
    <div className='c-single-product'>
      <div className='c-images'>p</div>
      <div className='c-product-info'>
        <h1>{mockProduct.name}</h1>
        <p>
          {EN_STRINGS['SingleProduct.StartsFrom']}{' '}
          <span>${mockProduct.price}</span>
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
              {EN_STRINGS['SingleProduct.TimeLeft']} <span>10 days 6 weeks</span>
            </p>
          </div>
          <div className='c-send-bid'>
            <input type='number' placeholder='Enter $56 or higher' />
            <button>
              {EN_STRINGS['SingleProduct.PlaceBid']} <GreaterIcon />
            </button>
          </div>
        </div>
        <div className='c-details'>
          <div className='c-navbar'>
            <p className='c-navbar-item c-focus'>{EN_STRINGS['SingleProduct.Details']}</p>
            <p className='c-navbar-item'>{EN_STRINGS['SingleProduct.SellerInformation']}</p>
            <p className='c-navbar-item'>{EN_STRINGS['SingleProduct.CustomReviews']}</p>
          </div>
          <div className='c-details-description'> 
            <p>{mockProduct.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
