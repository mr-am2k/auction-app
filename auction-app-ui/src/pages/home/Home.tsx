import { useState, useEffect, useContext } from 'react';
import { GreaterIcon } from 'assets/icons';
import { Category, HomeProducts, Loading } from 'components';
import EN_STRINGS from 'util/en_strings';

import './home.scss';
import { Product } from 'models/product';
import productsService from 'services/productService';
import { Link } from 'react-router-dom';
import PageContext from 'store/page-context/page-context';

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
  const { setNavbarItems } = useContext(PageContext);
  const [randomProduct, setRandomProduct] = useState<Product>();
  const [lastChanceProducts, setLastChanceProducts] = useState<Product[]>([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState<Product[]>([]);
  const [newArrivalsActive, setNewArrivalsActive] = useState(true);
  const [lastChanceActive, setLastChanceActive] = useState(false);

  const navbarItemClass = 'c-navbar-item';
  const focusedNavbarItem = navbarItemClass + ' c-focus';

  const fetchSingleProduct = () => {
    productsService
      .getRandomProduct()
      .then((data) => setRandomProduct(data))
      .catch((error) => console.log(error));
  };

  const fetchLastChanceProducts = (queryParam: string) => {
    if (!lastChanceProducts.length) {
      productsService
        .search(queryParam)
        .then((data) => setLastChanceProducts(data.content))
        .catch((error) => console.log(error));
    }
  };

  const fetchNewArrivalProducts = (queryParam: string) => {
    productsService
      .search(queryParam)
      .then((data) => setNewArrivalProducts(data.content))
      .catch((error) => console.log(error));
  };

  const handleLastChanceOnClick = () => {
    setLastChanceActive(true);
    setNewArrivalsActive(false);
    fetchLastChanceProducts(EN_STRINGS['Home.LastChanceFetch']);
  };

  useEffect(() => {
    setNavbarItems([])
    fetchSingleProduct();
    fetchNewArrivalProducts(EN_STRINGS['Home.NewArrivalFetch']);
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
            <Loading />
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

              <Link
                to={`/shop/${randomProduct.id}`}
              >
                <button>
                  {EN_STRINGS['Home.BidNow']} <GreaterIcon />
                </button>
              </Link>
            </div>

            <Link to={`/shop/${randomProduct.id}`}>
              <img src={randomProduct?.imageURL[0]} alt='Highlighted product' />
            </Link>
          </div>
        )}
      </div>

      <div className='c-bottom-part'>
        <div className='c-navbar'>
          <p
            className={`${
              newArrivalsActive ? focusedNavbarItem : navbarItemClass
            }`}
            onClick={() => {
              setNewArrivalsActive(true);
              setLastChanceActive(false);
            }}
          >
            {EN_STRINGS['Home.NewArrivals']}
          </p>

          <p
            className={`${
              lastChanceActive ? focusedNavbarItem : navbarItemClass
            }`}
            onClick={handleLastChanceOnClick}
          >
            {EN_STRINGS['Home.LastChance']}
          </p>
        </div>

        <div className='c-items'>
          {newArrivalsActive &&
            (!newArrivalProducts.length ? (
              <Loading />
            ) : (
              <HomeProducts product={newArrivalProducts} />
            ))}
          {lastChanceActive &&
            (!lastChanceProducts.length ? (
              <Loading />
            ) : (
              <HomeProducts product={lastChanceProducts} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
