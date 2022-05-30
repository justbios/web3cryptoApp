import React, { memo } from 'react';
//components
import { Wrapper, Transaction_Block, Text } from './style';
//utils
import moment from 'moment';
import {TransactionEntity} from "../../features/transactions_management/transaction_entity";

interface TransactionType {
  transaction: TransactionEntity;
}

const Transaction = ({ transaction }: TransactionType) => {
  return (
    <Wrapper>
      <Transaction_Block>
        <Text>date: </Text>
        <Text numberOfLines={1}>{moment(transaction.date).format('DD.MM.YYYY')}</Text>
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
