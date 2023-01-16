import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import productsService from 'services/productService';

import {Splitter} from 'components';
import {Product} from 'models/product';
import {ROUTES} from 'util/routes';
import {EN_STRINGS, RELATED_PRODUCTS} from 'translation/en';

import './related-products.scss';

type Props = {
  children?: React.ReactNode;
  categoryId: string;
  productId: string;
};

const RelatedProducts: React.FC<Props> = ({categoryId, productId}) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>();

  const requestParams = {categoryId: categoryId, productId: productId};

  const getRelatedProducts = (params: {}) => {
    productsService
      .getRelatedProducts({params})
      .then((productsPage) => setRelatedProducts(productsPage.content));
  };

  useEffect(() => {
    getRelatedProducts(requestParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="c-related-products-container">
      <h2>{RELATED_PRODUCTS.RELATED_PRODUCTS}</h2>

      <Splitter />

      {relatedProducts?.length ? (
        <div className="c-related-products">
          {relatedProducts?.map((product, index) => (
            <div className="c-product-card" key={index}>
              <Link to={`${ROUTES.PRODUCT}/${product.id}`}>
                <img src={product.imageURLs[0]} alt={product.name} />
              </Link>

              <Link to={`${ROUTES.PRODUCT}/${product.id}`}>
                <h3>{product.name}</h3>
              </Link>

              <p>
                {`${EN_STRINGS.HOME.START_FROM} `}
                {<span>${product.startPrice}</span>}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <h2>{RELATED_PRODUCTS.WITHOUT_PRODUCTS}</h2>
      )}
    </div>
  );
};

export default RelatedProducts;
