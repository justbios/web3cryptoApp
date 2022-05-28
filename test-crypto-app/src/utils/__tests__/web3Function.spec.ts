import { Web3Function } from '../web3Function';

describe('Web 3 functions test suite', () => {
  let functionsInstance: Web3Function;

  const mockWeb3 = {
    eth: {
      getBalance: jest.fn(),
      accounts: {
        privateKeyToAccount: jest.fn(),
      },
    },
    utils: {
      fromWei: jest.fn(),
    },
  };

  beforeEach(() => {
    functionsInstance = new Web3Function(mockWeb3 as any);
  });

  it('getBalance should fetch balance for an account from web3', async () => {
    //arrange
    const tAccountAddress = '0x0';
    //act
    await functionsInstance.getBalance(tAccountAddress);
    //assert
    expect(mockWeb3.eth.getBalance).toHaveBeenCalledWith('0x0');
  });

  it('getBalance should return response in ether (not wei)', async () => {
    //arrange
    const balance = '10';
    mockWeb3.eth.getBalance.mockResolvedValue(balance);
    //act
    await functionsInstance.getBalance('0x0');
    //assert
    expect(mockWeb3.utils.fromWei).toHaveBeenCalledWith(balance, 'ether');
  });

  it('getAccount should call return Account instance', async () => {
    //arrange
    const tAccountAddress = '0x0';
    //act
    functionsInstance.getAccount(tAccountAddress);
    //assert
    expect(mockWeb3.eth.accounts.privateKeyToAccount).toHaveBeenCalledWith('0x0');
  });
});
