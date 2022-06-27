import React, { memo, VFC } from 'react';
import { View, Image, Pressable, StyleSheet, Text } from 'react-native';

//components
import Button from '../Button';
//utils
import { Colors, shadow } from '../../utils/colors';

interface IBalanceProps {
  balance: string;
  title: string;
  currency: string;
  onPress: () => void;
}

const Balance: VFC<IBalanceProps> = ({ balance, currency, onPress, title }) => {
  return (
    <View style={styles.main}>
      <View style={styles.balance}>
        <Text style={styles.topText}>{title}</Text>
        <View style={styles.bottomText}>
          <Text>{balance}</Text>
          <Text style={{ marginLeft: 10 }}>{currency}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  balance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceNumber: {
    color: Colors.black,
    fontSize: 20,
  },
  bottomText: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonBlock: { marginTop: 20, alignItems: 'center' },
  main: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 25,
    ...shadow.light,
  },
  topText: {
    fontSize: 18,
  },
});

export default memo(Balance);
