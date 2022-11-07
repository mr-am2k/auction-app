import axios, { AxiosResponse } from 'axios';
import { Product } from 'models/product';

axios.defaults.baseURL = 'http://localhost:5000/api/v1';

const responseBody = <T>(response: AxiosResponse<T>) => response.data; 
const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Products = {
    list: () => requests.get<Product[]>('/'),
    singleProduct: (id:string) => requests.get<Product>(`/${id}`),
    randomProduct: () => requests.get<Product>('/randomProduct'),
    lastOrNew: () => requests.get<Product[]>('/searchProducts')
};

const agent = {
  Products
};

export default agent;