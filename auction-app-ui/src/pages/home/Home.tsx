import { Category } from 'components';
import EN_STRINGS from 'util/en_strings';

import './home.scss';

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
  return (
    <div className='c-home-wrapper'>
      <div className='c-top-part'>
        <div className='c-categories'>
          <p className='c-category-heading'>{EN_STRINGS['Home.Categories']}</p>
          {DUMMY_CATEGORIES.map((item, index: number) => (
            <Category categoryName={item} key={index} />
          ))}
        </div>

        <p>Product</p>
      </div>

      <div className='c-bottom-part'>
        <p>Last chance</p>
      </div>
    </div>
  );
};

export default Home;
