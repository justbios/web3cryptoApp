import { Text, StyleSheet } from 'react-native';
import React, { useState, useEffect, memo, useCallback } from 'react';
//libs
import { BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner';
// component
import Button from '../components/Button';
import { Routes } from '../navigation/Routes';
import { Box } from '../components/Box';
//recoil
import { useSetRecoilState } from 'recoil';
import { accountAtom } from '../store/account/atom';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PermissionStatus } from 'expo-modules-core/src/PermissionsInterface';
import di, {DI_TOKENS} from "../di";
import {IAccountManagement} from "../features/account_management/account_management_interface";

const Welcome: React.VFC<NativeStackScreenProps<any>> = ({ navigation }) => {

const walletConnect = () => {
  console.log('hjel')
}

  return (
    <Box flex={1} alignItems='center' justifyContent='center'>
  <Button text='Wallet Connect' onPress={walletConnect} />
    </Box>
  );
};

export default memo(Welcome);
