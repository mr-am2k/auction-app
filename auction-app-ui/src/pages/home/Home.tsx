import { useState, useEffect } from 'react';
import { GreaterIcon } from 'assets/icons';
import { Category, HomeProducts, Loading } from 'components';
import EN_STRINGS from 'util/en_strings';

import './home.scss';
import { Product } from 'models/product';
import productsService from 'services/productService';

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
    const data = await productsService.randomProduct();
    setRandomProduct(data);
  };

  const fetchLastChanceProducts = async (queryParam: string) => {
    if (lastChanceProducts.length < 1) {
      const data = await productsService.lastOrNew(queryParam);
      setLastChanceProducts(data);
    }
  };

  const fetchNewArrivalProducts = async (queryParam: string) => {
    const data = await productsService.lastOrNew(queryParam);
    setNewArrivalProducts(data);
  };


  useEffect(() => {
    fetchSingleProduct();
    fetchNewArrivalProducts(
      EN_STRINGS['Home.NewArrivalFetch']
    );
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

        {!randomProduct && (
          <div className='c-main-product'>
            {' '}
            <Loading />{' '}
          </div>
        )}
        {randomProduct && (
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
        )}
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
              fetchLastChanceProducts(EN_STRINGS['Home.LastChanceFetch']);
            }}
          >
            {EN_STRINGS['Home.LastChance']}
          </p>
        </div>

        <div className='c-items'>
          {newArrivalsActive && newArrivalProducts.length < 1 && <Loading />}
          {newArrivalsActive && newArrivalProducts.length > 0 && (
            <HomeProducts product={newArrivalProducts} />
          )}
          {lastChanceActive && lastChanceProducts.length < 1 && <Loading />}
          {lastChanceActive && lastChanceProducts.length > 0 && (
            <HomeProducts product={lastChanceProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
