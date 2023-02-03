import axios, { AxiosResponse } from 'axios';
import { LOCAL_STORAGE } from 'util/constants';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.request.use(config => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN);

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers.AuthorizationRefresh = `Refresh ${refreshToken}`;
  }
  return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: <T>(url: string, params?: {}) => axios.get<T>(url, params).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

export const buildUrl = (route: string) => `${process.env.REACT_APP_BASE_URL}${route}`;
