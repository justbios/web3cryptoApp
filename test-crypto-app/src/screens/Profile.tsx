import {
  View,
  Text,
  SafeAreaView,
  ListRenderItem,
} from 'react-native';
import React, { memo, useCallback, useState } from 'react';
// libs
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
//components
import Form from '../components/Form';
import Transaction from '../components/Transaction';
import { Box } from '../components/Box';
//recoil
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { transactionAtom } from '../store/transaction/atom';
import { transactionsSelector } from '../store/transaction/selectors';
import { getBalanceSelector } from '../store/account/selectors';
import { TransactionEntity } from '../features/transactions_management/transaction_entity';
import { CARD_LENGTH, SPACING} from '../utils/Constants';

const Profile: React.VFC = () => {
  const transactions = useRecoilValue(transactionsSelector);
  const balance = useRecoilValue(getBalanceSelector);
  const setForm = useSetRecoilState(transactionAtom);
  
  const [scrollx, setScrollx] = useState<number>(0)

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

  const keyExtractor = useCallback((item: TransactionEntity) => item.hash, []);

   const renderItem = useCallback<ListRenderItem<TransactionEntity>>(
    ({ item, index }) => {
      return(
        <Transaction transaction={item} scrollx={scrollx} index={index} />
    )},
    [scrollx]
  );

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

        <Animated.FlatList
        onScroll={(event) => {
          setScrollx(event.nativeEvent.contentOffset.x)
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingTop: SPACING}}
        horizontal={true}
        snapToAlignment="center"
        snapToInterval={CARD_LENGTH}
        scrollEventThrottle={16}
        data={transactions}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        bounces={false}
      />
      </Box>
    </Box>
  );
};

export default memo(Profile);


