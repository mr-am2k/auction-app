import axios from 'axios';
import { Product } from 'models/product';
import requests from 'lib/agent';

axios.defaults.baseURL = 'http://localhost:8080/api/v1/products';

const productsService = {
    list: () => requests.get<Product[]>('/'),
    singleProduct: (id: string) => requests.get<Product>(`/${id}`),
    randomProduct: () => requests.get<Product>('/randomProduct'),
    lastOrNew: (queryParam: string) =>
      requests.get<Product[]>(`/searchProducts?oldOrNew=${queryParam}`),
  };
  

export default productsService