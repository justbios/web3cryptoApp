import { View, Text, StyleSheet } from 'react-native';
import React, {useState, useEffect, memo, useCallback} from 'react';
//libs
import {BarCodeScannedCallback, BarCodeScanner} from 'expo-barcode-scanner';
// component
import Button from '../components/Button';
import { getAccount } from '../utils/web3Function';
import { Routes } from '../navigation/Routes';
//recoil
import { useSetRecoilState } from 'recoil';
import { account } from '../store/account/atom';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {PermissionStatus} from "expo-modules-core/src/PermissionsInterface";

const Welcome:React.VFC<NativeStackScreenProps<any>> = ({ navigation }) => {
  const setAccount = useSetRecoilState(account);
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
      // console.log(data);
      setAccount(getAccount(data));
      return navigation.navigate(Routes.Profile);
    } catch (e) {
      alert('QR code is not valid');
    }
  }, [])

  const handleScanAgainPress = useCallback(() => {
    setScanned(false);
  }, [])

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={styles.contentContainer}
      />
      {scanned && (
        <View style={styles.buttonView}>
          <Button text="Tap to Scan Again" onPress={handleScanAgainPress} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  buttonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
});

export default memo(Welcome);
