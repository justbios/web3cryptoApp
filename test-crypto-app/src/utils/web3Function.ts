import {Account} from 'web3-core';
import web3Instance from "../api/web3Instance";
import Web3 from "web3";

export class Web3Function {
  constructor(private web3: Web3) {
  }

  getBalance = async (address: string): Promise<string> => {
    const balance = await this.web3.eth.getBalance(address);
    return this.web3.utils.fromWei(balance, 'ether');
  };

  getAccount = (key: string): Account => {
    return this.web3.eth.accounts.privateKeyToAccount(key);
  };
}

const functionsInstance = new Web3Function(web3Instance);

export const getBalance = functionsInstance.getBalance;
export const getAccount = functionsInstance.getAccount;

