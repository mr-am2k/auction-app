import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api/v1/';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if(token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};
