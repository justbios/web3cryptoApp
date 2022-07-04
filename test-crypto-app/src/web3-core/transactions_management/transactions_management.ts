import {
  IGetTransactionsConfig,
  ITransactionsManagement,
} from '../../features/transactions_management/transactions_management_interface';
import { AxiosInstance } from 'axios';
import { TransactionEntity } from '../../features/transactions_management/transaction_entity';
import { apiKey } from '../../utils/Constants';
import Web3 from 'web3';

interface IEtherscanResult {
  message: string;
  result: any[];
  status: string;
}

export default class TransactionsManagement implements ITransactionsManagement {
  constructor(private axios: AxiosInstance, private web3: Web3) {}

  async getTransaction(config: IGetTransactionsConfig): Promise<TransactionEntity[]> {
    const { status, data } = await this.axios.get<IEtherscanResult>(
      `/api?module=account&action=txlist&address=${config.address}&startblock=0&endblock=99999999&page=${config.offset}&offset=${config.limit}&sort=asc&apikey=${apiKey}`
    );

    if (status === 200) {
      return data?.result?.map((item) => ({
        to: item['to'],
        from: item['from'],
        value: this.web3.utils.fromWei(item['value'], 'ether'),
        date: new Date(Number(item['timeStamp']) * 1000),
        hash: item['hash'],
      }));
    } else {
      throw new Error('Failed to get list of transactions');
    }
  }
}
