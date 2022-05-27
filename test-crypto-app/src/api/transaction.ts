import { apiKey } from '../utils/Constants';
import { _axios } from './index';

export interface TransactionModel {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
}

export const getTransaction = async (address: string, limit: number = 10): Promise<TransactionModel[]> => {
  return await _axios<TransactionModel[]>(
    'get',
    `/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=${limit}&sort=asc&apikey=${apiKey}`
  );
};
