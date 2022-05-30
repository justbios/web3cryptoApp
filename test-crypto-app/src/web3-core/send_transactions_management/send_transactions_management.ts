import {
    IRawTransactionHash,
    ISendTransactionConfig,
    ISendTransactionManagement
} from "../../features/send_transactions_management/send_transactions_management_interface";
import Web3 from "web3";

export default class SendTransactionsManagement implements ISendTransactionManagement {
    constructor(
        private web3: Web3
    ) {
    }

    async sendTransaction(config: ISendTransactionConfig): Promise<IRawTransactionHash> {
        const value = this.web3.utils.toWei(config.value, 'ether');
        const transactionToEstimate = {
            to: config.to,
            from: config.from,
            value,
        }

        const gas = await this.web3.eth.estimateGas(transactionToEstimate);

        const transactionToSign = {
            ...transactionToEstimate,
            gas
        };

        const signedTransaction = await this.web3.eth.accounts.signTransaction(transactionToSign, config.privateKey);

        const {status} = await this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction!);

        if (status) {
            return signedTransaction.rawTransaction!;
        } else {
            throw new Error('Failed to send transaction') //TODO CREATE OWN ERROR INSTANCE + IMPLEMENT I18N (VIA DEPENDENCY)
        }
    }
}
