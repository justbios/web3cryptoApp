import {
  StyleSheet,
  Text,
  SafeAreaView,
  ListRenderItem,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { memo, useCallback, useState, useEffect } from 'react';
// libs
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner';
//components
import Transaction from '../components/Transaction';
import { Box } from '../components/Box';
import { TransactionEntity } from '../features/transactions_management/transaction_entity';
import { CARD_LENGTH, SPACING } from '../utils/Constants';
import Button from '../components/Button';
import Input from '../components/Input';
import Balance from '../components/Balance';
import { observer } from 'mobx-react-lite';
import accountStore from '../store/account/account';
import transaction from '../store/transaction/transaction';

const Profile: React.VFC = observer(() => {
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [scrollx, setScrollx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const onPress = useCallback(async () => {
    if (accountStore.account) {
      transaction.sendTransaction(accountStore.account, amount, address);
    }
  }, [accountStore.account]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (accountStore.account?.address) {
      transaction.getTransaction(accountStore?.account?.address);
    }
  }, []);

  const handleBarCodeScanned = useCallback<BarCodeScannedCallback>(async ({ data }) => {
    setScanned(true);
    try {
      setAddress(data);
      setOpenCamera(false);
    } catch (e) {
      alert('QR code is not valid');
    }
  }, []);

  const handleScanAgainPress = useCallback(() => {
    setScanned(false);
  }, []);

  // start  style

  const Title = styled.Text({
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  });

  // end  style

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const keyExtractor = useCallback((item: TransactionEntity) => item.hash, []);

  const renderItem = useCallback<ListRenderItem<TransactionEntity>>(
    ({ item, index }) => {
      return (
        <Transaction
          transaction={item}
          scrollx={scrollx}
          index={index}
          isFlipped={isFlipped}
          onPress={flipCard}
        />
      );
    },
    [scrollx, isFlipped]
  );

  return (
    <>
      <Box flex={1} bg={'#fff1'}>
        <SafeAreaView />

        <Box marginX={'10%'}>
          <Balance
            title="Баланс"
            balance={accountStore.balance}
            currency={'ETH'}
            onPress={console.log}
          />
          <Input
            title="address"
            onChange={setAddress}
            scan={() => setOpenCamera(true)}
            value={address}
          />
          <Input title="amount" onChange={setAmount} />
          <View style={{ alignItems: 'center' }}>
            <Button text="submit" onPress={onPress} />
          </View>
        </Box>
        <Box>
          <Box alignItems={'center'} marginBottom={20}>
            <Text>Transaction</Text>
          </Box>
          <Animated.FlatList
            onScroll={(event) => {
              setScrollx(event.nativeEvent.contentOffset.x);
            }}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: SPACING }}
            horizontal={true}
            snapToAlignment="center"
            snapToInterval={CARD_LENGTH}
            scrollEventThrottle={16}
            data={transaction.transactions}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            bounces={false}
          />
        </Box>
      </Box>

      {openCamera && (
        <>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <Box flex={1} alignItems="center" justifyContent="flex-end" marginBottom={30}>
            {scanned && (
              <Box flex={1} alignItems="center" justifyContent="flex-end" mb={30}>
                <Button text="Tap to Scan Again" onPress={handleScanAgainPress} />
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  );
});

export default memo(Profile);
