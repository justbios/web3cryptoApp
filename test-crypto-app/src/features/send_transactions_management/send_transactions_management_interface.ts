export interface ISendTransactionConfig {
    from: string;
    to: string;
    value: string;
    privateKey: string;
}
export type IRawTransactionHash = string;

export interface ISendTransactionManagement {
    sendTransaction: (config: ISendTransactionConfig) => Promise<IRawTransactionHash>
}
