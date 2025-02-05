import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { usePage } from 'hooks/usePage';

import productsService from 'services/productService';

import { Category, HomeProducts, Loading } from 'components';
import { Product } from 'models/product';
import { EN_STRINGS } from 'translation/en';
import { LAST_CHANCE, NEW_ARRIVAL } from 'util/constants';
import { ROUTES } from 'util/routes';

import './home.scss';

import { GreaterIcon } from 'assets/icons';
import categoryService from 'services/categoryService';
import { SubCategory } from 'models/subCategory';
import { organizeCategories } from 'util/categoryUtils';

const Home = () => {
  const { setNavbarItems } = usePage();
  const [randomProduct, setRandomProduct] = useState<Product>();
  const [lastChanceProducts, setLastChanceProducts] = useState<Product[]>([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState<Product[]>([]);
  const [newArrivalsActive, setNewArrivalsActive] = useState(true);
  const [lastChanceActive, setLastChanceActive] = useState(false);
  const [categories, setCategories] = useState<SubCategory[]>([]);

  const navbarItemClass = 'c-navbar-item';
  const focusedNavbarItem = navbarItemClass + ' c-focus';

  const fetchSingleProduct = () => {
    productsService
      .getRandomProduct()
      .then(data => setRandomProduct(data.content[0]))
      .catch(error => console.log(error));
  };

  const fetchCategories = () => {
    categoryService.getCategories().then(categories => {
      setCategories(organizeCategories(categories));
    });
  };

  const fetchLastChanceProducts = (queryParam: string) => {
    if (!lastChanceProducts.length) {
      productsService
        .search(queryParam)
        .then(data => setLastChanceProducts(data.content))
        .catch(error => console.log(error));
    }
  };

  const fetchNewArrivalProducts = (queryParam: string) => {
    productsService
      .search(queryParam)
      .then(data => setNewArrivalProducts(data.content))
      .catch(error => console.log(error));
  };

  const handleLastChanceOnClick = () => {
    setLastChanceActive(true);
    setNewArrivalsActive(false);
    fetchLastChanceProducts(LAST_CHANCE);
  };

  useEffect(() => {
    setNavbarItems([]);
    fetchSingleProduct();
    fetchNewArrivalProducts(NEW_ARRIVAL);
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='c-home-wrapper'>
      <div className='c-top-part'>
        <div className='c-categories'>
          <p className='c-category-heading'>{EN_STRINGS.HOME.CATEGORIES}</p>
          {categories?.map((item, index: number) => (
            <Category categoryName={item.name} categoryId={item.categoryId} key={index} />
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
                {EN_STRINGS.HOME.START_FROM} ${randomProduct?.startPrice}
              </h1>

              <p>{randomProduct?.description}</p>

              <Link to={`${ROUTES.PRODUCT}/${randomProduct.id}`}>
                <button>
                  {EN_STRINGS.HOME.BID_NOW} <GreaterIcon />
                </button>
              </Link>
            </div>

            <Link to={`${ROUTES.PRODUCT}/${randomProduct.id}`}>
              <img src={randomProduct?.imageURLs[0]} alt={EN_STRINGS.HOME.HIGHLIGHTED_PRODUCT} />
            </Link>
          </div>
        )}
      </div>

      <div className='c-bottom-part'>
        <div className='c-navbar'>
          <p
            className={`${newArrivalsActive ? focusedNavbarItem : navbarItemClass}`}
            onClick={() => {
              setNewArrivalsActive(true);
              setLastChanceActive(false);
            }}
          >
            {EN_STRINGS.HOME.NEW_ARRIVALS}
          </p>

          <p className={`${lastChanceActive ? focusedNavbarItem : navbarItemClass}`} onClick={handleLastChanceOnClick}>
            {EN_STRINGS.HOME.LAST_CHANCE}
          </p>
        </div>

        <div className='c-items'>
          {newArrivalsActive && (!newArrivalProducts.length ? <Loading /> : <HomeProducts product={newArrivalProducts} />)}
          {lastChanceActive && (!lastChanceProducts.length ? <Loading /> : <HomeProducts product={lastChanceProducts} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
