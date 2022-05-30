import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from 'react-native';
import React, { memo, useCallback } from 'react';
// libs
import styled from 'styled-components/native';
//components
import Form from '../components/Form';
import Transaction from '../components/Transaction';
import { Box } from '../components/Box';
//api
import { TransactionModel } from '../api/transaction';
import web3Instance from '../api/web3Instance';
// utils
import { Colors } from '../utils/colors';
//recoil
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accountAtom } from '../store/account/atom';
import { transactionSelector } from '../store/transaction/selectors';
import { transactionAtom } from '../store/transaction/atom';

const Profile: React.VFC = () => {
  const { transaction, balance } = useRecoilValue(transactionSelector);
  const setForm = useSetRecoilState(transactionAtom);

  const onPress = useCallback(
    async (amount: string, address: string) => {
      setForm({ amount, address });
    },
    [setForm]
  );

  // start  style

  const Title = styled.Text({
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  });

  // end  style

  const renderItem = useCallback<ListRenderItem<TransactionModel>>(
    ({ item }) => (
      <Transaction
        transaction={{ ...item, value: web3Instance.utils.fromWei(item.value, 'ether') }}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: TransactionModel) => item.hash, []);

  const separator = () => <Box height={2} backgroundColor={Colors.white} />;

  return (
    <Box flex={1}>
      <SafeAreaView />
      <Box marginX={'10%'}>
        <Title>Баланс</Title>
        <Text>{balance || 0} ETH</Text>
        <View>
          <Form onSubmit={onPress} />
        </View>
      </Box>
      <Box flex={1}>
        <Box alignItems={'center'} marginBottom={20}>
          <Text>Transaction</Text>
        </Box>
        {transaction.length ? (
          <FlatList
            data={transaction}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={separator}
          />
        ) : (
          <ActivityIndicator />
        )}
      </Box>
    </Box>
  );
};

export default memo(Profile);
