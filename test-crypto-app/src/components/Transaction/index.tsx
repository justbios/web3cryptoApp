import React, { memo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
//components
import { TransactionModel } from './TransactionModel';
//utils
import { Colors } from '../../utils/colors';
import moment from 'moment';

interface TransactionType {
  transaction: TransactionModel;
}

const Transaction = ({ transaction }: TransactionType) => {
  const date = new Date(Number(transaction?.timeStamp) * 1000);

  return (
    <View style={styles.main}>
      <View style={styles.transactionBlock}>
        <Text style={styles.text}>date: </Text>
        <Text style={styles.text} numberOfLines={1}>
          {moment(date).format('DD.MM.YYYY')}
        </Text>
      </View>
      <View style={styles.transactionBlock}>
        <Text style={styles.text}>from: </Text>
        <Text style={styles.text} numberOfLines={1}>
          {transaction?.from}
        </Text>
      </View>
      <View style={styles.transactionBlock}>
        <Text style={styles.text}>to: </Text>
        <Text style={styles.text} numberOfLines={1}>
          {transaction?.to}
        </Text>
      </View>
      <View style={styles.transactionBlock}>
        <Text style={styles.text}>value: </Text>
        <Text style={styles.text} numberOfLines={1}>
          {transaction?.value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    padding: 18,
    backgroundColor: 'lightgray',
  },
  text: {
    color: Colors.black,
    fontSize: 12,
  },
  transactionBlock: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
});

export default memo(Transaction);
