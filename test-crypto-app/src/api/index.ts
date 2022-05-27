import axios, {AxiosResponse} from 'axios';
import { urlAPI as baseURL } from '../utils/Constants';

const axiosClient = axios.create();

axiosClient.interceptors.request.use((request) => {
  console.log('STARTING REQUEST', request);
  return request;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (err) => {
    const error = err?.response;

    !!error && console.log('INTERCEPTORS ERROR RESPONSE: ', error);

    if (error?.status === 401) {
      console.log('ERROR 401');
    }
    return Promise.reject(err);
  }
);

const options = (method = '', url = '', data = undefined, headers = {}) => {
  return {
    url,
    data,
    method,
    baseURL,
    timeout: 30000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
};

export const _axios = <ResultType>(method = '', url = '', data = undefined, headers = {}): Promise<ResultType> => {
  return new Promise((resolve, reject) => {
    axiosClient(options(method, url, data, headers))
      .then((response: AxiosResponse<ResultType>) => {
        return resolve(response.data);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
