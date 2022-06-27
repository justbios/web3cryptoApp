import { selector } from 'recoil';
import { accountAtom } from '../account/atom';
import { transactionAtom } from './atom';
import di, { DI_TOKENS } from '../../di';
import { ISendTransactionManagement } from '../../features/send_transactions_management/send_transactions_management_interface';
import { ITransactionsManagement } from '../../features/transactions_management/transactions_management_interface';

export const transactionsSelector = selector({
  key: 'getTransaction',
  get: async ({ get }) => {
    const { address } = get(accountAtom);

    const transactionsManager = di.get<ITransactionsManagement>(DI_TOKENS.TransactionsManager);

    return transactionsManager.getTransaction({
      address,
      limit: 10,
      offset: 1,
    });
  },
});

export const sendTransactionSelector = selector({
  key: 'sendTransaction',
  get: async ({ get }) => {
    const { address, amount } = get(transactionAtom);
    const account = get(accountAtom);

    const sendTransactionManager = di.get<ISendTransactionManagement>(
      DI_TOKENS.CurrencyManagerFacade
    );

    try {
      return await sendTransactionManager.sendTransaction({
        value: amount,
        from: account.address,
        to: address,
        privateKey: account.privateKey,
      });
    } catch (e) {
      return false;
    }
  },
});
