import { makeAutoObservable } from 'mobx';
import di, { DI_TOKENS } from '../../di';
import { AccountEntity } from '../../features/account_management/account_entity';
import { IAccountManagement } from '../../features/account_management/account_management_interface';
import { IAccountState } from '../../features/storeFeatures/account/accountManeger';

class Account implements IAccountState {
  account?: AccountEntity;
  balance: string = '';
  balanceLoading: boolean = true;
  constructor() {
    makeAutoObservable(this);
  }
  *getAccount(data: string) {
    try {
      const accountManagement = di.get<IAccountManagement>(DI_TOKENS.AccountManager);
      this.account = yield accountManagement.getAccountByPrivateKey(data);
      if (this.account?.address) {
        this.balance = yield accountManagement.getAccountBalance(this.account.address);
      }
      this.balanceLoading = false;
    } catch (e) {
      this.balanceLoading = false;
    }
  }
}

export default new Account();
