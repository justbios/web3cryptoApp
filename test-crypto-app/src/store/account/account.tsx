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

  async getAccount(data: string) {
    const accountManagement = di.get<IAccountManagement>(DI_TOKENS.AccountManager);

    this.account = await accountManagement.getAccountByPrivateKey(data);
    if (this.account.address) {
      this.balance = await accountManagement.getAccountBalance(this.account.address);
    }
  }
}

export default new Account();
