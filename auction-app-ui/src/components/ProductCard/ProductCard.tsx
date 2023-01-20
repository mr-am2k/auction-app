import { Product } from 'models/product';
import './product-card.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from 'util/routes';
import { EN_STRINGS } from 'translation/en';

type Props = {
  children?: React.ReactNode;
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className='c-item'>
      <Link to={`${ROUTES.PRODUCT}/${product.id}`}>
        <img src={product.imageURLs[0]} alt={product.name} />
      </Link>

      <Link to={`${ROUTES.PRODUCT}/${product.id}`}>
        <h3>{product.name}</h3>
      </Link>

      <p>
        {EN_STRINGS.HOME.START_FROM}: {<span>${product.startPrice}</span>}
      </p>
    </div>
  );
};

export default ProductCard;
