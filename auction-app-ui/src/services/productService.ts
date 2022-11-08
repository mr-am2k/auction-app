import axios from 'axios';
import { Product } from 'models/product';
import agent from 'lib/agent';

axios.defaults.baseURL = 'http://localhost:8080/api/v1/products';

const productsService = {
    getAll: () => agent.get<Product[]>('/'),
    getSingleProduct: (id: string) => agent.get<Product>(`/${id}`),
    getRandomProduct: () => agent.get<Product>('/random'),
    search: (queryParam: string) =>
      agent.get<any>(`/search?criteria=${queryParam}`),
  };
  

export default productsService