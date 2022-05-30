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
// utils
import { Colors } from '../utils/colors';
//recoil
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { transactionAtom } from '../store/transaction/atom';
import {transactionsSelector} from "../store/transaction/selectors";
import {getBalanceSelector} from "../store/account/selectors";
import {TransactionEntity} from "../features/transactions_management/transaction_entity";

const Profile: React.VFC = () => {
  const transactions = useRecoilValue(transactionsSelector);
  const balance = useRecoilValue(getBalanceSelector);
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

  const renderItem = useCallback<ListRenderItem<TransactionEntity>>(
    ({ item }) => (
      <Transaction
        transaction={item}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: TransactionEntity) => item.hash, []);

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
        {transactions.length ? (
          <FlatList
            data={transactions}
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
