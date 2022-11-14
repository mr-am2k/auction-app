import './home-products.scss';

import EN_STRINGS from 'util/en_strings';
import { Product } from 'models/product';

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
          <img src={item.imageURL[0]} alt='Product' />
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
