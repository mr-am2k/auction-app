import { useEffect, useState } from 'react';
import './shop.scss';
import productsService from 'services/productService';
import { Product } from 'models/product';
import { ProductCard, ShopFilters } from 'components';
import { SHOP } from 'translation/en';
import { useFilter } from 'hooks/useFilter';

const Shop = () => {
  const { searchFilterValues } = useFilter();

  const [pageNumber, setPageNumber] = useState(0);
  const [prevPageNumber, setPrevPageNumber] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = (pageNumber: number) => {
    const productFilter = {
      pageNumber: pageNumber,
      name: searchFilterValues.name,
      categoryId: searchFilterValues.categoryId,
      subcategoryIds: searchFilterValues.subcategoryIds?.join(),
      minPrice: searchFilterValues.minPrice,
      maxPrice: searchFilterValues.maxPrice,
      productSort: searchFilterValues.productSort,
    };

    productsService.getProducts({ params: productFilter }).then(fetchedPage => {
      if (prevPageNumber === pageNumber) {
        setProducts(fetchedPage.content);
        setLastPage(fetchedPage.last);
      } else {
        setProducts(products => [...products, ...fetchedPage.content]);
        setLastPage(fetchedPage.last);
      }
    });
  };

  const handlePageChange = () => {
    setPrevPageNumber(pageNumber);
    setPageNumber(pageNumber => pageNumber + 1);
  };

  useEffect(() => {
    if (prevPageNumber === pageNumber) {
      fetchProducts(0);
      setPageNumber(0);
      setPrevPageNumber(0);
    } else {
      fetchProducts(pageNumber);
      setPrevPageNumber(pageNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilterValues, pageNumber]);

  return (
    <div className='c-shop-page-wrapper'>
      <div className='c-filters'>
        <ShopFilters/>
      </div>
      <div className='c-products'>
        <div className='c-products-sorting'>
          <p>Sorting</p>
        </div>

        <div className='c-products-display'>
          <div className='c-products-view'>
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
          {!lastPage && (
            <div className='c-button-container'>
              <button onClick={handlePageChange}>{SHOP.EXPLORE_MORE}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
