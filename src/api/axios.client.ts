import axios, { AxiosResponse } from 'axios';

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: any) {
    // Do somethings here
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

//  default axiosClient;
