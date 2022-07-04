import { Text, StyleSheet, Modal, Image } from 'react-native';
import React, { useState, useEffect, memo, useCallback } from 'react';
//libs
import { BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner';
// component
import Button from '../components/Button';
import { Routes } from '../navigation/Routes';
import { Box } from '../components/Box';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PermissionStatus } from 'expo-modules-core/src/PermissionsInterface';

import WalletConnect from '@walletconnect/client';
import { IConnector } from '@walletconnect/types';
import { shadow } from '../utils/colors';
import { observer } from 'mobx-react-lite';
import account from '../store/account/account';

const ScanQR: React.VFC<NativeStackScreenProps<any>> = observer(({ navigation }) => {
  const [connector, setConnector] = useState<IConnector>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    })();
  }, []);

  const handleBarCodeScanned = useCallback<BarCodeScannedCallback>(async ({ data }) => {
    setScanned(true);
    try {
      account.getAccount(data);
      setOpenCamera(false);
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
    const data = '6a06e6c7750bc841ec05667699102e3ace103cccbf425c8b3734707f2e3ceca8';
    account.getAccount(data);
    return navigation.navigate(Routes.Profile);
  };

  // walet connect
  function handleChange(data: string) {
    const uri = typeof data === 'string' ? data : '';
    if (uri) {
      try {
        const connector = new WalletConnect({ uri });
        setConnector(connector);
        if (connector) {
          setModalVisible(true);
        }
      } catch (e) {
        console.log(e, 'ERROR');
      }
    }
  }

  const approveSesion = () => {
    if (connector) {
      connector.approveSession({
        accounts: ['0x68f359cfa669b103ecbc48aae4a6cdcccf63e8d1'],
        chainId: 4,
      });
      setModalVisible(false);
    }
  };

  const rejectSession = () => {
    if (connector) {
      connector.rejectSession({
        message: 'OPTIONAL_ERROR_MESSAGE', // optional
      });
      setModalVisible(false);
    }
  };

  return (
    <>
      <Box flex={1}>
        {openCamera ? (
          <>
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
          </>
        ) : (
          <>
            <Box flex={1} px={3} alignItems="center" justifyContent="center">
              <Button text="Scan" onPress={() => setOpenCamera(true)} />
              {/* <Box as={Text} pb={3}>
                OR
              </Box>
              <Input onChange={handleChange} /> */}
            </Box>
            <Box justifyContent="center" alignItems="center">
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <Box
                  style={{
                    margin: 20,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 35,
                    ...shadow.light,
                  }}
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                >
                  <Box flexDirection="row" justifyContent="space-evenly" alignItems="center">
                    <Button text={'Approve'} width={100} onPress={approveSesion} />
                    <Button width={100} text={'Reject'} onPress={rejectSession} />
                  </Box>
                </Box>
              </Modal>
            </Box>
          </>
        )}
      </Box>
    </>
  );
});

export default memo(ScanQR);
