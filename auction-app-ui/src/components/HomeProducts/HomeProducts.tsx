import { Link } from 'react-router-dom';

import { Product } from 'models/product';
import { ROUTES } from 'util/routes';
import EN_STRINGS from 'translation/en';

import './home-products.scss';

type Props = {
  children?: React.ReactNode;
  product: Product[];
};

const HomeProducts: React.FC<Props> = ({ product }) => {
  return (
    <div className='c-new-arrivals'>
      {product.map((item, index: number) => (
        <div className='c-item' key={index}>
          <Link to={`${ROUTES.PRODUCT}/${item.id}`}>
            <img src={item.imageURLs[0]} alt={item.name} />
          </Link>

          <Link to={`${ROUTES.PRODUCT}/${item.id}`}>
            <h3>{item.name}</h3>
          </Link>
          
          <p>
            {EN_STRINGS.HOME.START_FROM}: {<span>${item.startPrice}</span>}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HomeProducts;
