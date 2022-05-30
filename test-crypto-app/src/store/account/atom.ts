import { atom } from 'recoil';
import {AccountEntity} from "../../features/account_management/account_entity";

export const accountAtom = atom({
  key: 'Account',
  default: {} as AccountEntity,
});
