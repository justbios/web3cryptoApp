import { selectorFamily, selector } from 'recoil';
import { TransactionModel, getTransaction } from '../../api/transaction';
import { getBalance } from '../../utils/web3Function';
import { account } from '../account/atom';
import { transactionAtom } from './atom';
import web3Instance from '../../api/web3Instance';

export const transactionSelector = selectorFamily({
  key: 'getTransaction',
  get: (_address: string) => async () => {
    const { result } = await getTransaction(_address);
    const balance = await getBalance(_address);
    return { transaction: result, balance };
  },
});

export const sendTransactionSelector = selector({
  key: 'sendTransaction',
  get: async ({ get }) => {
    const { address, amount } = get(transactionAtom);
    const _account = get(account);
    try {
      const value = web3Instance.utils.toWei(amount, 'ether');
      const fixedTransaction = {
        to: address,
        value,
        from: _account.address,
      };
      const gas = await web3Instance.eth.estimateGas(fixedTransaction);
      const transaction = {
        ...fixedTransaction,
        gas,
      };
      const signedTx = await _account.signTransaction(transaction);
      const { status } = await web3Instance.eth.sendSignedTransaction(signedTx.rawTransaction!);
      if (status) {
        await getTransaction(address);
      } else {
        throw new Error('The problem was occurred');
      }
    } catch (e) {
      alert('something went wrong');
      console.log(e, 'ERROR');
    }
  },
});
