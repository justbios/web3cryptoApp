import { AccountEntity } from '../../account_management/account_entity';
import { TransactionEntity } from '../../transactions_management/transaction_entity';

export interface ITransactionState {
  transactions: TransactionEntity[];
  transactionsLoading: boolean;
  getTransaction: (address: string) => void;
  sendTransaction: (account: AccountEntity, amount: string, address: string) => void;
}
