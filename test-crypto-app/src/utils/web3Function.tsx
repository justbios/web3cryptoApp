import Web3 from 'web3';

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/372f31c1ef064786a4192d428733538c')
);

export const getBalance = async (address: string) => {
  const balance = await web3.eth.getBalance(address);
  return web3.utils.fromWei(balance, 'ether');
};

export const getAccount = (key: string) => {
  return web3.eth.accounts.privateKeyToAccount(key);
};
