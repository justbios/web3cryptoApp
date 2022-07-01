import { Container } from 'inversify';
import axios, { AxiosInstance } from 'axios';
import { urlAPI as baseURL } from '../utils/Constants';
import Web3 from 'web3';
import { IAccountManagement } from '../features/account_management/account_management_interface';
import AccountManagement from '../web3-core/account_management/account_management';
import { ISendTransactionManagement } from '../features/send_transactions_management/send_transactions_management_interface';
import SendTransactionsManagement from '../web3-core/send_transactions_management/send_transactions_management';
import { ITransactionsManagement } from '../features/transactions_management/transactions_management_interface';
import TransactionsManagement from '../web3-core/transactions_management/transactions_management';
import { ICurrencyManagementFacade } from '../features/currency_management_facade/currency_management_facade';
import EtherManagementFacade from '../web3-core/currency_management_facade/ether_management_facade';

export const DI_TOKENS = {
  Axios: Symbol('Axios'),
  Web3: Symbol('Web3'),
  AccountManager: Symbol('AccountManager'),
  SendTransactionsManager: Symbol('SendTransactionsManager'),
  TransactionsManager: Symbol('TransactionsManager'),
  CurrencyManagerFacade: Symbol('CurrencyManagerFacade'),
};

export class DependenciesContainer {
  private static instance: DependenciesContainer;
  static web3: Web3;
  static di: Container | null;
  constructor() {
    if (DependenciesContainer.instance) {
      return DependenciesContainer.instance;
    }
    DependenciesContainer.di = new Container();
    DependenciesContainer.instance = this;
  }
  initDi() {
    if (DependenciesContainer.di) {
      DependenciesContainer.di.bind<AxiosInstance>(DI_TOKENS.Axios).toConstantValue(
        axios.create({
          baseURL,
          timeout: 5000,
        })
      );
      DependenciesContainer.di
        .bind<Web3>(DI_TOKENS.Web3)
        .toConstantValue(
          new Web3(
            new Web3.providers.HttpProvider(
              'https://ropsten.infura.io/v3/372f31c1ef064786a4192d428733538c'
            )
          )
        );

      //Managers
      DependenciesContainer.di
        .bind<IAccountManagement>(DI_TOKENS.AccountManager)
        .toConstantValue(new AccountManagement(DependenciesContainer.di.get<Web3>(DI_TOKENS.Web3)));
      DependenciesContainer.di
        .bind<ISendTransactionManagement>(DI_TOKENS.SendTransactionsManager)
        .toConstantValue(
          new SendTransactionsManagement(DependenciesContainer.di.get<Web3>(DI_TOKENS.Web3))
        );
      DependenciesContainer.di
        .bind<ITransactionsManagement>(DI_TOKENS.TransactionsManager)
        .toConstantValue(
          new TransactionsManagement(
            DependenciesContainer.di.get<AxiosInstance>(DI_TOKENS.Axios),
            DependenciesContainer.di.get<Web3>(DI_TOKENS.Web3)
          )
        );

      //FACADE
      DependenciesContainer.di
        .bind<ICurrencyManagementFacade>(DI_TOKENS.CurrencyManagerFacade)
        .toConstantValue(
          new EtherManagementFacade(
            DependenciesContainer.di.get<IAccountManagement>(DI_TOKENS.AccountManager),
            DependenciesContainer.di.get<ISendTransactionManagement>(
              DI_TOKENS.SendTransactionsManager
            ),
            DependenciesContainer.di.get<ITransactionsManagement>(DI_TOKENS.TransactionsManager)
          )
        );
    }
  }
  destroyDI() {
    DependenciesContainer.di = null;
  }
}
