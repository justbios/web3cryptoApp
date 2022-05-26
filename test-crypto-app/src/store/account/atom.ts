import { atom } from 'recoil';

export interface Account {
  address: string;
  encrypt: () => void;
  privateKey: string;
  sign: () => void;
  signTransaction: () => void;
}

export const account = atom({
  key: 'Account',
  default: {} as Account,
});
