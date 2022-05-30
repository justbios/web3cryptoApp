import {IAccountManagement} from "../account_management/account_management_interface";
import {ISendTransactionManagement} from "../send_transactions_management/send_transactions_management_interface";
import {ITransactionsManagement} from "../transactions_management/transactions_management_interface";

export interface ICurrencyManagementFacade extends IAccountManagement, ISendTransactionManagement, ITransactionsManagement {}
