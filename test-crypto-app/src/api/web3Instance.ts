import Web3 from "web3";

const web3Instance = new Web3(
    new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/372f31c1ef064786a4192d428733538c')
);

export default web3Instance;
