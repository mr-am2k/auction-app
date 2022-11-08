import axios from 'axios';
import { Product } from 'models/product';
import agent from 'lib/agent';

axios.defaults.baseURL = 'http://localhost:8080/api/v1/products';

const productsService = {
    getAll: () => agent.get<Product[]>('/'),
    getSingleProduct: (id: string) => agent.get<Product>(`/${id}`),
    getRandomProduct: () => agent.get<Product>('/randomProduct'),
    search: (queryParam: string) =>
      agent.get<Product[]>(`/searchProducts?oldOrNew=${queryParam}`),
  };
  

export default productsService