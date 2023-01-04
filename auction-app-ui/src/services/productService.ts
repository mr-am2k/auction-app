import { Product } from 'models/product';
import agent from 'lib/agent';
import { CreateProductRequest } from 'requestModels/createProductRequest';

const BASE_URL = '/products';

const productsService = {
  getAll: () => agent.get<Product[]>(BASE_URL),
  getSingleProduct: (id: string) => agent.get<Product>(`${BASE_URL}/${id}`),
  getRandomProduct: () => agent.get<any>(`${BASE_URL}/random`),
  search: (queryParam: string) =>
    agent.get<any>(`${BASE_URL}/search?criteria=${queryParam}`),
  getProductsForUse: () => agent.get<Product[]>(`${BASE_URL}/user-products`),
  addProduct: (createProductRequest: CreateProductRequest) =>
    agent.post<Product>(BASE_URL, createProductRequest),
};

export default productsService;
