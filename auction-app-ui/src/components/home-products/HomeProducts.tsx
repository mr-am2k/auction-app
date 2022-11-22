import { Link } from 'react-router-dom';

import { Product } from 'models/product';
import EN_STRINGS from 'util/en_strings';
import ROUTES from 'util/routes';

import './home-products.scss';

type Props = {
  children?: React.ReactNode;
  product: Product[];
};

//when there is backend created, productName and productPrice will be replaced with actual list of products, and then will be mapped through that list
const HomeProducts: React.FC<Props> = ({ product }) => {
  return (
    <div className='c-new-arrivals'>
      {product.map((item, index: number) => (
        <div className='c-item' key={index}>
          <Link to={`/${ROUTES.PRODUCT}/${item.id}`}>
            <img src={item.imageURLs[0]} alt={item.name} />
          </Link>
          <Link to={`/${ROUTES.PRODUCT}/${item.id}`}>
            <h3>{item.name}</h3>
          </Link>
          <p>
            {EN_STRINGS['HomeProducts.StartFrom']}: {<span>${item.price}</span>}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HomeProducts;
