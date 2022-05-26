import { View, Text } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
//recoil
import { useRecoilValue } from 'recoil';
import { account } from '../store/account/atom';
import { getBalance } from '../utils/web3Function';

function Profile() {
  const _account = useRecoilValue(account);

  const [balance, setBalance] = useState<string>('');

  useEffect(() => {
    getBalance(_account.address)
      .then((balance) => setBalance(balance))
      .catch((e) => console.log(e));
  }, []);

  return (
    <View>
      <Text>{balance}</Text>
    </View>
  );
}

export default memo(Profile);
