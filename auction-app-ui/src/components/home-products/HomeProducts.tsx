import './home-products.scss';

import defaultImage from 'assets/images/home-main-image.png';
import EN_STRINGS from 'util/en_strings';
import { Product } from 'models/product';

type Props = {
  children?: React.ReactNode;
  product: Product[];
};

//when there is backend created, productName and productPrice will be replaced with actual list of products, and then will be mapped through that list
const NewArrivals: React.FC<Props> = ({ product }) => {
  const arrayForLooping = [1, 2, 3, 4, 5, 6, 7, 8]; //just used for mapping, because there should be 8 products for new arrivals/last chance and there is no list of products from backend
  return (
    <div className='c-new-arrivals'>
      {product.map((item, index: number) => (
        <div className='c-item' key={index}>
          <img src={defaultImage} alt='Product' />
          <h3>{item.name}</h3>
          <p>
            {EN_STRINGS['HomeProducts.StartFrom']} {<span>{item.price}</span>}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NewArrivals;
