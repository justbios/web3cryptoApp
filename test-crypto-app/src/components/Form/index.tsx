import { View } from 'react-native';
import React, { memo, useCallback, useState, VFC } from 'react';
import Input from '../Input';
import Button from '../Button';

interface FormType {
  onSubmit: (anmount: string, address: string) => void;
}

const Form: VFC<FormType> = ({ onSubmit }) => {
  const [address, setAddress] = useState('');
  const [anmount, setAnmount] = useState('');

  const onPress = useCallback(() => {
    onSubmit(anmount, address);
  }, [anmount, address]);

  return (
    <View>
      <Input title="adress" onChange={setAddress} />
      <Input title="anmount" onChange={setAnmount} />
      <View style={{ alignItems: 'center' }}>
        <Button text="submit" onPress={onPress} />
      </View>
    </View>
  );
};

export default memo(Form);
