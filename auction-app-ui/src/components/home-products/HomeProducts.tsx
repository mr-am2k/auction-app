import './home-products.scss';

import defaultImage from 'assets/images/home-main-image.png';
import EN_STRINGS from 'util/en_strings';

type Props = {
  children?: React.ReactNode;
  productName: string;
  productPrice: string;
};

//when there is backend created, productName and productPrice will be replaced with actual list of products, and then will be mapped through that list
const NewArrivals: React.FC<Props> = ({ productName, productPrice }) => {
  const arrayForLooping = [1, 2, 3, 4, 5, 6, 7, 8]; //just used for mapping, because there should be 8 products for new arrivals/last chance and there is no list of products from backend
  return (
    <div className='c-new-arrivals'>
      {arrayForLooping.map((item, index: number) => (
        <div className='c-item' key={index}>
          <img src={defaultImage} alt='Product' />
          <h3>{productName}</h3>
          <p>
            {EN_STRINGS['HomeProducts.StartFrom']} {<span>{productPrice}</span>}{' '}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NewArrivals;
