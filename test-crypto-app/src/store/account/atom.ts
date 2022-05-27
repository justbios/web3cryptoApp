import { atom } from 'recoil';
import {Account} from "web3-core";

export const account = atom({
  key: 'Account',
  default: {} as Account,
});

//TODO MOVE TRANSACTIONS TO THE STORE
