import { makeAutoObservable } from 'mobx';
import di, { DI_TOKENS } from '../../di';
import { AccountEntity } from '../../features/account_management/account_entity';
import { ISendTransactionManagement } from '../../features/send_transactions_management/send_transactions_management_interface';
import { ITransactionsManagement } from '../../features/transactions_management/transactions_management_interface';
import { TransactionEntity } from '../../features/transactions_management/transaction_entity';

class Transaction {
  transactions: TransactionEntity[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  *getTransaction(address: string) {
    const transactionsManager = di.get<ITransactionsManagement>(DI_TOKENS.TransactionsManager);
    this.transactions = yield transactionsManager.getTransaction({
      address,
      limit: 10,
      offset: 1,
    });
  }

  *sendTransaction(account: AccountEntity, amount: string, address: string) {
    const sendTransactionManager = di.get<ISendTransactionManagement>(
      DI_TOKENS.CurrencyManagerFacade
    );

    try {
      yield sendTransactionManager.sendTransaction({
        value: amount,
        from: account.address,
        to: address,
        privateKey: account.privateKey,
      });
    } catch (e) {
      return false;
    }
  }
}

export default new Transaction();
