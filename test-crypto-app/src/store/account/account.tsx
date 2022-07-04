import { makeAutoObservable } from 'mobx';
import di, { DI_TOKENS } from '../../di';
import { AccountEntity } from '../../features/account_management/account_entity';
import { IAccountManagement } from '../../features/account_management/account_management_interface';

class Account {
  account?: AccountEntity;
  balance: string = '';

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
    } catch (e) {
      console.log('Error');
    }
  }
}

export default new Account();
