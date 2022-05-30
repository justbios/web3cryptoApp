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
  const setAccount = useSetRecoilState(accountAtom);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    })();
  }, []);

  const handleBarCodeScanned = useCallback<BarCodeScannedCallback>(async ({ data }) => {
    setScanned(true);
    try {
      const accountManagement = di.get<IAccountManagement>(DI_TOKENS.AccountManager);
      const account = await accountManagement.getAccountByPrivateKey(data);
      setAccount(account);
      return navigation.navigate(Routes.Profile);
    } catch (e) {
      alert('QR code is not valid');
    }
  }, []);

  const handleScanAgainPress = useCallback(() => {
    setScanned(false);
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  const testStart = async () => {
    const accountManagement = di.get<IAccountManagement>(DI_TOKENS.AccountManager);
    const account = await accountManagement.getAccountByPrivateKey('6a06e6c7750bc841ec05667699102e3ace103cccbf425c8b3734707f2e3ceca8');
    setAccount(account);
    return navigation.navigate(Routes.Profile);
  };

  return (
    <Box flex={1}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Button text="Test start" onPress={testStart} />
      <Box flex={1} alignItems="center" justifyContent="flex-end" marginBottom={30}>
        {scanned && (
          <Box flex={1} alignItems="center" justifyContent="flex-end" mb={30}>
            <Button text="Tap to Scan Again" onPress={handleScanAgainPress} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default memo(Welcome);
