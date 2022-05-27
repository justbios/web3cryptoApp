import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect, memo } from 'react';
//libs
import { BarCodeScanner } from 'expo-barcode-scanner';
// component
import Button from '../components/Button';
import { getAccount } from '../utils/web3Function';
import { Routes } from '../navigation/Routes';
//recoil
import { useSetRecoilState } from 'recoil';
import { account } from '../store/account/atom';

function Welcome({ navigation }: { navigation: any }) {
  const setAccount = useSetRecoilState(account);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    try {
      console.log(data);
      const res = getAccount(data);
      setAccount(res as any);
      return navigation.navigate(Routes.Profile);
    } catch (e) {
      alert('QR code is not valid');
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={{
          ...styles.container,
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: 30,
        }}
      />
      {scanned && (
        <View style={styles.buttonView}>
          <Button text={'Tap to Scan Again'} onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
});

export default memo(Welcome);
