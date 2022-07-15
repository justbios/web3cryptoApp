import { AccountEntity } from '../../account_management/account_entity';

export interface IAccountState {
  account?: AccountEntity;
  balance: string;
  balanceLoading: boolean;
  getAccount: (data: string) => void;
}
