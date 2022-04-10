import axios, {AxiosRequestConfig} from 'axios';
import * as RootNavigation from './RootNavigation';

const apiURL = 'http://localhost:8000/api';

const REQ_TIMEOUT = 20000;

export const redirectToLogin = () =>
  RootNavigation.navigate('LoginScreen', null);

const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL: apiURL,
  timeout: REQ_TIMEOUT,
};

axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
);

export const axios401Interceptor = () => {
  axios.interceptors.response.use(
    res => res,
    error => {
      console.error(error);
      if (error.response.status === 401) {
        redirectToLogin();
      }
      return error;
    },
  );
};

export const axiosClient = axios.create(axiosRequestConfiguration);
