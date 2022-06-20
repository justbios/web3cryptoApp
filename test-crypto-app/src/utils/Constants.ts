import {Dimensions} from 'react-native';


export const urlAPI = 'https://api-ropsten.etherscan.io';
export const apiKey = '876M9BZW2IPIM5ATMM6ZM2I583S9ESJA2Nr';

// 

const {width} = Dimensions.get('screen')

export const CARD_LENGTH = width * 0.8
export const SPACING = 10
export const SIDECARD_LENGTH = (width - CARD_LENGTH) / 1.8
