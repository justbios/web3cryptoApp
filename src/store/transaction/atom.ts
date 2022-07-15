import { atom } from 'recoil';

interface inTransaction {
  address: string;
  amount: string;
}

export const transactionAtom = atom({
  key: 'transactionAtom',
  default: {} as inTransaction,
});
