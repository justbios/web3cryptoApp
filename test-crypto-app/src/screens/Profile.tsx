import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from 'react-native';
import React, { memo, useCallback, useEffect, useState } from 'react';
//components
import Form from '../components/Form';
import Transaction from '../components/Transaction';
//api
import { getTransaction, TransactionModel } from '../api/transaction';
//utils
import { getBalance } from '../utils/web3Function';
//recoil
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accountAtom } from '../store/account/atom';
import { Colors } from '../utils/colors';
import web3Instance from '../api/web3Instance';
import { transactionSelector } from '../store/transaction/selectors';
import { transactionAtom } from '../store/transaction/atom';

const Profile: React.VFC = () => {
  const _account = useRecoilValue(accountAtom);
  const { transaction, balance } = useRecoilValue(transactionSelector(_account.address));
  const setForm = useSetRecoilState(transactionAtom);

  const onPress = useCallback(
    async (amount: string, address: string) => {
      setForm({ amount, address });
    },
    [setForm]
  );

  const renderItem = useCallback<ListRenderItem<TransactionModel>>(
    ({ item }) => (
      <Transaction
        transaction={{ ...item, value: web3Instance.utils.fromWei(item.value, 'ether') }}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: TransactionModel) => item.hash, []);

  const separator = () => <View style={styles.separator} />;

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />
      <View style={{ marginHorizontal: '10%' }}>
        <Text style={styles.title}>Баланс</Text>
        <Text>{balance || 0} ETH</Text>
        <View>
          <Form onSubmit={onPress} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ textAlign: 'center', marginBottom: 20 }}>Transaction</Text>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  separator: {
    height: 2,
    backgroundColor: Colors.white,
  },
});

export default memo(Profile);
