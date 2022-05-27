import { apiKey } from '../utils/Constants';
import { _axios } from './index';

export const getTransaction = async (address: string) => {
  return await _axios(
    'get',
    `/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`
  );
};
