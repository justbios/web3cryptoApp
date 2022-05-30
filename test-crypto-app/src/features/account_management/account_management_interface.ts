import {AccountEntity} from "./account_entity";

export interface IAccountManagement {
    getAccountByPrivateKey: (privateKey: string) => Promise<AccountEntity>;
    getAccountBalance: (address: string) => Promise<string>;
}
