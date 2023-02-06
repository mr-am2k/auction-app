import { Product } from 'models/product';
import './product-list-view.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from 'util/routes';
import { EN_STRINGS } from 'translation/en';
import { BiDollarCircle } from 'react-icons/bi';

type Props = {
  children?: React.ReactNode;
  product: Product;
};

const ProductListView: React.FC<Props> = ({ product }) => {
  return (
    <div className='c-product-list-view-wrapper'>
      <div className='c-product-list-view-image'>
        <img src={product.imageURLs[0]} alt={product.name} />
      </div>

      <div className='c-product-list-view-content'>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h1>{`${EN_STRINGS.SINGLE_PRODUCT.STARTS_FROM} $${product.startPrice}`}</h1>
        <Link to={`${ROUTES.PRODUCT}/${product.id}`}>
          <button>{EN_STRINGS.BIDS.BID} <BiDollarCircle/></button>
        </Link>
      </div>
    </div>
  );
};

export default ProductListView;
