import { Product } from 'models/product';
import agent from 'lib/agent';
import { CreateProductDataRequest } from 'requestModels/create/createProductDataRequest';

const BASE_URL = '/products';

const productsService = {
  getAll: () => agent.get<Product[]>(BASE_URL),
  getSingleProduct: (id: string) => agent.get<Product>(`${BASE_URL}/${id}`),
  getRandomProduct: () => agent.get<any>(`${BASE_URL}/random`),
  search: (queryParam: string) =>
    agent.get<any>(`${BASE_URL}/search?criteria=${queryParam}`),
  getUserProducts: (userId:string) => agent.get<Product[]>(`${BASE_URL}/user/${userId}`),
  addProduct: (createProductDataRequest: CreateProductDataRequest) =>
    agent.post<Product>(BASE_URL, createProductDataRequest),
};

export default productsService;
