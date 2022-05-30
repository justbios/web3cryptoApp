import {TransactionEntity} from "./transaction_entity";

export interface IGetTransactionsConfig {
    limit?: number;
    offset?: number;
    address: string;
}

export interface ITransactionsManagement {
  getTransaction: (config: IGetTransactionsConfig) => Promise<TransactionEntity[]>;
}
