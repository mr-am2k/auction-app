import { useState, useEffect } from 'react';
import { GreaterIcon } from 'assets/icons';
import { Category, HomeProducts } from 'components';
import EN_STRINGS from 'util/en_strings';

import defaultImage from 'assets/images/home-main-image.png';
import './home.scss';
import agent from 'lib/agent';
import { Product } from 'models/product';

const DUMMY_CATEGORIES = [
  'Fashion',
  'Accessories',
  'Jewelry',
  'Shoes',
  'Sportware',
  'Home',
  'Electronics',
  'Mobile',
  'Computer',
  'All Categories',
];

const Home = () => {
  const [randomProduct, setRandomProduct] = useState<Product>();
  const [lastChanceProducts, setLastChanceProducts] = useState<Product[]>([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState<Product[]>([]);
  const [newArrivalsActive, setNewArrivalsActive] = useState(true);
  const [lastChanceActive, setLastChanceActive] = useState(false);

  let newArrivalsClassName = newArrivalsActive
    ? 'c-navbar-item c-focus'
    : 'c-navbar-item';
  let lastChanceClassName = lastChanceActive
    ? 'c-navbar-item c-focus'
    : 'c-navbar-item';

  const fetchSingleProduct = async () => {
    const data = await agent.Products.randomProduct();
    setRandomProduct(data);
  };

  const fetchLastChanceOrNewArrivalProducts = async (queryParam: string) => {
    if (queryParam === 'last-chance' && lastChanceProducts.length < 1) {
      const data = await agent.Products.lastOrNew(queryParam);
      setLastChanceProducts(data);
    }
    if (queryParam === 'new-arrival') {
      const data = await agent.Products.lastOrNew(queryParam);
      setNewArrivalProducts(data);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
    fetchLastChanceOrNewArrivalProducts('new-arrival');
    console.log(lastChanceProducts);
  }, []);

  return (
    <div className='c-home-wrapper'>
      <div className='c-top-part'>
        <div className='c-categories'>
          <p className='c-category-heading'>{EN_STRINGS['Home.Categories']}</p>
          {DUMMY_CATEGORIES.map((item, index: number) => (
            <Category categoryName={item} key={index} />
          ))}
        </div>

        <div className='c-main-product'>
          <div className='c-info'>
            <h1>{randomProduct?.name}</h1>
            <h1 className='c-price'>
              {EN_STRINGS['HomeProducts.StartFrom']} ${randomProduct?.price}
            </h1>

            <p>{randomProduct?.description}</p>

            <button>
              {EN_STRINGS['Home.BidNow']} <GreaterIcon />
            </button>
          </div>

          <img src={randomProduct?.imageURL} alt='Highlighted product' />
        </div>
      </div>

      <div className='c-bottom-part'>
        <div className='c-navbar'>
          <p
            className={newArrivalsClassName}
            onClick={() => {
              setNewArrivalsActive(true);
              setLastChanceActive(false);
            }}
          >
            {EN_STRINGS['Home.NewArrivals']}
          </p>

          <p
            className={lastChanceClassName}
            onClick={() => {
              setLastChanceActive(true);
              setNewArrivalsActive(false);
              fetchLastChanceOrNewArrivalProducts('last-chance');
            }}
          >
            {EN_STRINGS['Home.LastChance']}
          </p>
        </div>

        <div className='c-items'>
          {newArrivalsActive && (
            <HomeProducts product={newArrivalProducts} />
          )}
          {lastChanceActive&& (
            <HomeProducts product={lastChanceProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
