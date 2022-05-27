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
//libs
import Web3 from 'web3';
//components
import Form from '../components/Form';
import Transaction from '../components/Transaction';
import { TransactionModel } from '../components/Transaction/TransactionModel';
//api
import { getTransaction } from '../api/transaction';
//utils
import { getAccount, getBalance } from '../utils/web3Function';
//recoil
import { useRecoilValue } from 'recoil';
import { account } from '../store/account/atom';
import { Colors } from '../utils/colors';

function Profile() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/372f31c1ef064786a4192d428733538c')
  );
  const _account = getAccount(account);

  const [balance, setBalance] = useState<string>('');
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    getBalance(_account.address)
      .then((balance) => setBalance(balance))
      .catch((e) => console.log(e));
  }, [_account.address]);

  useEffect(() => {
    getTransaction(_account.address).then((body) => {
      const tenTransaction = body.result.slice(body.result.length - 10);
      setTransaction(tenTransaction);
    });
  }, []);

  const onPress = useCallback(async (amount, address) => {
    try {
      const value = web3.utils.toWei(amount, 'ether');
      // const gasPrice = await web3.eth.getGasPrice();
      const gas = await web3.eth.estimateGas({
        to: address,
        value,
        from: _account.address,
      });
      const transaction = {
        to: address,
        from: _account.address,
        value,
        gas,
      };
      const signedTx = await _account.signTransaction(transaction);
      const res = await web3.eth.sendSignedTransaction(signedTx.rawTransaction!);
    } catch (e) {
      console.log(e, 'ERROR');
    }
  }, []);

  const renderItem = useCallback(({ item, index }) => {
    return (
      <View key={index + ' '}>
        <Transaction transaction={{ ...item, value: web3.utils.fromWei(item.value, 'ether') }} />
      </View>
    );
  }, []);

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
            renderItem={renderItem as ListRenderItem<TransactionModel>}
            ItemSeparatorComponent={separator}
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </View>
  );
}

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
