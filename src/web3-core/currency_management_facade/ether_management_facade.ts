import {ICurrencyManagementFacade} from "../../features/currency_management_facade/currency_management_facade";
import {IAccountManagement} from "../../features/account_management/account_management_interface";
import {
    ISendTransactionConfig,
    ISendTransactionManagement
} from "../../features/send_transactions_management/send_transactions_management_interface";
import {
    IGetTransactionsConfig,
    ITransactionsManagement
} from "../../features/transactions_management/transactions_management_interface";

export default class EtherManagementFacade implements ICurrencyManagementFacade {
    constructor(
        private accountManager: IAccountManagement,
        private sendTransactionsManager: ISendTransactionManagement,
        private transactionsManager: ITransactionsManagement
    ) {
    }
    getAccountBalance = (address: string) => this.accountManager.getAccountBalance(address);

    getAccountByPrivateKey = (privateKey: string) => this.accountManager.getAccountByPrivateKey(privateKey);

    getTransaction = (config: IGetTransactionsConfig) => this.transactionsManager.getTransaction(config);

    sendTransaction = (config: ISendTransactionConfig) => this.sendTransactionsManager.sendTransaction(config);
}
