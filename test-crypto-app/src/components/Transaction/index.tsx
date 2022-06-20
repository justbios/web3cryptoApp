import React, { memo } from 'react';
//components
import { TransactionBlock, Text, Wrapper } from './style';
//utils
import moment from 'moment';
import { TransactionEntity } from '../../features/transactions_management/transaction_entity';
import Animated, {interpolate, Extrapolate, useAnimatedStyle, withSpring, useSharedValue} from 'react-native-reanimated';
import { CARD_LENGTH,  SPACING } from '../../utils/Constants';

interface TransactionType {
  transaction: TransactionEntity;
  index: number
  scrollx: number
}

const Transaction = ({ transaction,index,scrollx }: TransactionType) => {
  const size = useSharedValue(0.8)

  const inputValues = [
    (index - 1) * CARD_LENGTH,
    index * CARD_LENGTH,
    (index + 1) * CARD_LENGTH,
  ];

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale:withSpring(size.value)
        },
      ],
    };
  });

  size.value = interpolate(
    scrollx,
     inputValues,
     [0.9, 1.1, 0.9],
     Extrapolate.CLAMP
   )


  return (
    <Animated.View
    style={[
      {
        width: CARD_LENGTH,
        paddingHorizontal: SPACING,
      },
      animatedStyles,
    ]}
    >
    <Wrapper>
      <TransactionBlock>
        <Text>date: </Text>
        <Text numberOfLines={1}>{moment(transaction.date).format('DD.MM.YYYY')}</Text>
      </TransactionBlock>
      <TransactionBlock>
        <Text>from: </Text>
        <Text numberOfLines={1}>{transaction?.from}</Text>
      </TransactionBlock>
      <TransactionBlock>
        <Text>to: </Text>
        <Text numberOfLines={1}>{transaction?.to}</Text>
      </TransactionBlock>
      <TransactionBlock>
        <Text>value: </Text>
        <Text numberOfLines={1}>{transaction?.value}</Text>
      </TransactionBlock>
    </Wrapper>
    </Animated.View>
  );
};

export default memo(Transaction);
