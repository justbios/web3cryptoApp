import React, { memo } from 'react';
//components
import { TransactionBlock, Text, Wrapper } from './style';
//utils
import moment from 'moment';
import { TransactionEntity } from '../../features/transactions_management/transaction_entity';
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import { CARD_LENGTH, SPACING } from '../../utils/Constants';
import { Box } from '../Box';
import { shadow } from '../../utils/colors';

interface TransactionType {
  transaction: TransactionEntity;
  index: number;
  scrollx: number;
  isFlipped: boolean;
  onPress: () => void;
}

const Transaction = ({ isFlipped, transaction, index, scrollx, onPress }: TransactionType) => {
  const size = useSharedValue(0.8);
  const flip = useSharedValue(0);

  const inputValues = [(index - 1) * CARD_LENGTH, index * CARD_LENGTH, (index + 1) * CARD_LENGTH];

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(size.value),
        },
      ],
    };
  });

  const animatedFlipStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: withSpring(`${flip.value}deg`),
        },
      ],
    };
  });
  flip.value = interpolate(isFlipped ? 180 : 0, [0, 180], [0, 180], Extrapolate.CLAMP);

  size.value = interpolate(scrollx, inputValues, [0.9, 1.1, 0.9], Extrapolate.CLAMP);

  return (
    <Animated.View
      style={[
        {
          width: CARD_LENGTH,
          padding: SPACING,
        },
        animatedStyles,
      ]}
    >
      <Animated.View style={animatedFlipStyles}>
        <Box as={Wrapper} onPress={onPress} style={{ ...shadow.light }}>
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
        </Box>
      </Animated.View>
    </Animated.View>
  );
};

export default memo(Transaction);
