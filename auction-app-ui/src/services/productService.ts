import { Product } from 'models/product';
import agent from 'lib/agent';
import { CreateProductDataRequest } from 'models/request/create/createProductDataRequest';
import { CreatePaymentRequest } from 'models/request/create/createPaymentRequest';

const BASE_URL = '/products';

const productsService = {
  getProducts: (params: {}) => agent.get<any>(BASE_URL, params),
  getSingleProduct: (id: string) => agent.get<Product>(`${BASE_URL}/${id}`),
  getRandomProduct: () => agent.get<any>(`${BASE_URL}/random`),
  search: (queryParam: string) => agent.get<any>(`${BASE_URL}/search?criteria=${queryParam}`),
  getUserProducts: (userId: string) => agent.get<Product[]>(`${BASE_URL}/user/${userId}`),
  addProduct: (createProductDataRequest: CreateProductDataRequest) => agent.post<Product>(BASE_URL, createProductDataRequest),
  getRelatedProducts: (params: {}) => agent.get<any>(`${BASE_URL}/related`, params),
  pay: (createPaymentRequest: CreatePaymentRequest) => agent.post<boolean>(`${BASE_URL}/pay`, createPaymentRequest),
};

export default productsService;
