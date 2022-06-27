import {Dimensions} from 'react-native';


export const urlAPI = 'https://api-ropsten.etherscan.io';
export const apiKey = '876M9BZW2IPIM5ATMM6ZM2I583S9ESJA2Nr';

// 

const {width} = Dimensions.get('screen')

export const CARD_LENGTH = width * 0.8
export const SPACING = 10
export const SIDECARD_LENGTH = (width - CARD_LENGTH) / 1.8


export const ETH_STANDARD_PATH = "m/44'/60'/0'/0";
export const ENTROPY_KEY = "ENTROPY";
export const MNEMONIC_KEY = "MNEMONIC";

export const DEFAULT_ACTIVE_INDEX = 0;
export const MAINNET_CHAIN_ID = 1;
export const ROPSTEN_CHAIN_ID = 3;
export const RINKEBY_CHAIN_ID = 4;
export const GOERLI_CHAIN_ID = 5;
export const DEFAULT_CHAIN_ID = RINKEBY_CHAIN_ID;