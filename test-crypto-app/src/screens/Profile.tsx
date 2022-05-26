import { View, Text, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import React, { memo, useCallback, useEffect, useState } from 'react';
//libs
import Web3 from 'web3';
//components
import Form from '../components/Form';
//recoil
import { useRecoilValue } from 'recoil';
import { account } from '../store/account/atom';
import { getBalance } from '../utils/web3Function';

function Profile() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/372f31c1ef064786a4192d428733538c')
  );
  const _account = useRecoilValue(account);

  const [balance, setBalance] = useState<string>('');

  useEffect(() => {
    console.log(_account);
    getBalance(_account.address)
      .then((balance) => setBalance(balance))
      .catch((e) => console.log(e));
  }, [_account.address]);

  const onPress = useCallback(async (amount, address) => {
    try {
      const nonce = await web3.eth.getTransactionCount(_account.address, 'latest');
      const transaction = {
        to: '0xce10e8b3b11965be2e18f5bcfc8e0a8e6123fcc6',
        value: web3.utils.fromWei(amount, 'ether'),
        gas: 30000,
        maxFeePerGas: 1000000108,
        nonce: nonce,
      };
      const signedTx = await web3.eth.accounts.signTransaction(transaction, _account.privateKey);
      console.log(signedTx);
      // web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
      //   if (!error) {
      //     console.log(
      //       '🎉 The hash of your transaction is: ',
      //       hash,
      //       "\n Check Alchemy's Mempool to view the status of your transaction!"
      //     );
      //   } else {
      //     console.log('❗Something went wrong while submitting your transaction:', error);
      //   }
      // });
    } catch (e) {
      console.log(e, 'ERROR');
    }
  }, []);

  return (
    <View style={{ flex: 1, marginHorizontal: '10%' }}>
      <SafeAreaView />
      <Text style={styles.title}>Баланс</Text>
      <Text>{balance || 0} ETH</Text>
      <View>
        <Form onSubmit={onPress} />
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
});

export default memo(Profile);
