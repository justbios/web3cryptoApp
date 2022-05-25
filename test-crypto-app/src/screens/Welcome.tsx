import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
//libs
import { BarCodeScanner } from 'expo-barcode-scanner';
// component
import Button from '../components/Button';
import { getAccount } from '../utils/web3Function';

export default function Welcome() {
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
    getAccount(data)
      .then((account) => console.log(account))
      .catch((e) => alert('QR code is not valid'));
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
      {scanned && (
        <View
          style={{
            ...styles.container,
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 30,
          }}
        >
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
});
