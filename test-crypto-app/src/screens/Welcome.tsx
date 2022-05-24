import { View, Text } from 'react-native';
import React from 'react';
// component
import Button from '../components/Button';

export default function Welcome() {
  return (
    <View>
      <Button onPress={() => console.log('hello')} text="hello" />
    </View>
  );
}
