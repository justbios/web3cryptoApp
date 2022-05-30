import React, { memo } from 'react';
//components
import { TransactionModel } from '../../api/transaction';
import { Wrapper, Transaction_Block, Text } from './style';
//utils
import { Colors } from '../../utils/colors';
import moment from 'moment';

interface TransactionType {
  transaction: TransactionModel;
}

const Transaction = ({ transaction }: TransactionType) => {
  const date = new Date(Number(transaction?.timeStamp) * 1000);

  return (
    <Wrapper>
      <Transaction_Block>
        <Text>date: </Text>
        <Text numberOfLines={1}>{moment(date).format('DD.MM.YYYY')}</Text>
      </Transaction_Block>
      <Transaction_Block>
        <Text>from: </Text>
        <Text numberOfLines={1}>{transaction?.from}</Text>
      </Transaction_Block>
      <Transaction_Block>
        <Text>to: </Text>
        <Text numberOfLines={1}>{transaction?.to}</Text>
      </Transaction_Block>
      <Transaction_Block>
        <Text>value: </Text>
        <Text numberOfLines={1}>{transaction?.value}</Text>
      </Transaction_Block>
    </Wrapper>
  );
};

export default memo(Transaction);
