import { useEffect, useState } from 'react';

import { useFilter } from 'hooks/useFilter';
import { usePage } from 'hooks/usePage';

import productsService from 'services/productService';

import { Product } from 'models/product';
import { ProductCard, ShopFilters, ShopHeaders } from 'components';
import { scrollToTop } from 'util/scrollUtils';
import { EN_STRINGS, SHOP } from 'translation/en';

import './shop.scss';

const Shop = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [prevPageNumber, setPrevPageNumber] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const { searchFilterValues } = useFilter();
  const { setNavbarTitle, setNavbarItems } = usePage();

  const fetchProducts = (pageNumber: number) => {
    setLoading(true);
    const subcategoryIds = searchFilterValues.subcategories?.map(subcategory => {
      return subcategory.id;
    });

    const productFilter = {
      pageNumber: pageNumber,
      name: searchFilterValues.name,
      categoryId: searchFilterValues.category?.id,
      subcategoryIds: subcategoryIds?.join(),
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
      setLoading(false);
    });
  };

  const handlePageChange = () => {
    setPrevPageNumber(pageNumber);
    setPageNumber(pageNumber => pageNumber + 1);
  };

  useEffect(() => {
    if (searchFilterValues.name === undefined || searchFilterValues.name === '') {
      setNavbarTitle([]);
      setNavbarItems([EN_STRINGS.NAVBAR.HOME]);
    } else {
      setNavbarTitle([]);
      setNavbarItems([EN_STRINGS.NAVBAR.HOME, searchFilterValues.name]);
    }
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilterValues.name]);

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
        <ShopFilters />
      </div>

      <div className='c-products'>
        <div className='c-products-sorting'>
          <ShopHeaders />
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

        {!loading && products.length === 0 && (
          <div className='c-empty-shop'>
            <h1>{SHOP.EMPTY_SHOP}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
