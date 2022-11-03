import { GreaterIcon } from 'assets/icons';
import { Category, HomeProducts } from 'components';
import EN_STRINGS from 'util/en_strings';

import defaultImage from 'assets/images/home-main-image.png';
import './home.scss';
import { useState } from 'react';

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
  const [newArrivals, setNewArrivals] = useState('c-navbar-item c-focus');
  const [lastChance, setLastChance] = useState('c-navbar-item');

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
            <h1>Running shoes</h1>
            <h1 className='c-price'>Start From $59.00</h1>
            
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum hendrerit odio a erat lobortis auctor. Curabitur
              sodales pharetra placerat. Aenean auctor luctus tempus. Cras
              laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus
              quis malesuada velit. In hac habitasse platea dictumst.
            </p>

            <button>
              {EN_STRINGS['Home.BidNow']} <GreaterIcon />
            </button>
          </div>

          <img src={defaultImage} alt='Highlighted product' />
        </div>
      </div>

      <div className='c-bottom-part'>
        <div className='c-navbar'>
          <p
            className={newArrivals}
            onClick={() => {
              setNewArrivals('c-navbar-item c-focus');
              setLastChance('c-navbar-item');
            }}
          >
            {EN_STRINGS['Home.NewArrivals']}
          </p>

          <p
            className={lastChance}
            onClick={() => {
              setLastChance('c-navbar-item  c-focus');
              setNewArrivals('c-navbar-item');
            }}
          >
            {EN_STRINGS['Home.LastChance']}
          </p>
        </div>

        <div className='c-items'>
          {newArrivals.includes('c-focus') && (
            <HomeProducts
              productName='Shoes collection'
              productPrice='$59.90'
            />
          )}
          {lastChance.includes('c-focus') && (
            <HomeProducts productName='Last chance' productPrice='$59.90' />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
