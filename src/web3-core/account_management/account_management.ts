import {IAccountManagement} from "../../features/account_management/account_management_interface";
import Web3 from "web3";
import {AccountEntity} from "../../features/account_management/account_entity";

export default class AccountManagement implements IAccountManagement {
    constructor(
        private web3: Web3
    ) {
    }

    async getAccountBalance(address: string): Promise<string> {
        const balance = await this.web3.eth.getBalance(address);
        return this.web3.utils.fromWei(balance, 'ether');
    }

    async getAccountByPrivateKey(privateKey: string): Promise<AccountEntity> {
        return this.web3.eth.accounts.privateKeyToAccount(privateKey);
    }

}
