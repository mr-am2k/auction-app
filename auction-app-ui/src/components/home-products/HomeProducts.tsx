import { Link } from 'react-router-dom';
import EN_STRINGS from 'util/en_strings';
import { Product } from 'models/product';

import './home-products.scss';

type Props = {
  children?: React.ReactNode;
  product: Product[];
};

//when there is backend created, productName and productPrice will be replaced with actual list of products, and then will be mapped through that list
const NewArrivals: React.FC<Props> = ({ product }) => {
  return (
    <div className='c-new-arrivals'>
      {product.map((item, index: number) => (
        <div className='c-item' key={index}>
          <Link to={`/shop/${item.id}`}>
            <img src={item.imageURL[0]} alt='Product' />
          </Link>
          <h3>{item.name}</h3>
          <p>
            {EN_STRINGS['HomeProducts.StartFrom']} {<span>${item.price}</span>}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NewArrivals;
