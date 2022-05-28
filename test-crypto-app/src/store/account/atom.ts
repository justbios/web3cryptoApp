import { atom } from 'recoil';
import { Account } from 'web3-core';

export const accountAtom = atom({
  key: 'Account',
  default: {} as Account,
});
