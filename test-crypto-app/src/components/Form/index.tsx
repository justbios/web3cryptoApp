import { View } from 'react-native';
import React, { memo, useCallback, useState, VFC } from 'react';
import Input from '../Input';
import Button from '../Button';

interface FormType {
  onSubmit: (anmount: string, address: string) => void;
}

const Form: VFC<FormType> = ({ onSubmit }) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const onPress = useCallback(() => {
    //TODO ADD VALIDATION
    onSubmit(amount, address);
  }, [amount, address]);

  return (
    <View>
      <Input title="address" onChange={setAddress} />
      <Input title="amount" onChange={setAmount} />
      <View style={{ alignItems: 'center' }}>
        <Button text="submit" onPress={onPress} />
      </View>
    </View>
  );
};

export default memo(Form);
