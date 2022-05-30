import { Text, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
//libs
import styled from 'styled-components/native';
//utils
import { Colors } from '../../utils/colors';

interface ButtonProp {
  text: string;
  onPress: () => void;
}
const Wrapper = styled(TouchableOpacity)(() => ({
  justifyContent: 'center',
  alignItems: 'center',
  width: 230,
  borderRadius: 30,
  paddingVertical: 14,
  backgroundColor: Colors.blue,
  marginVertical: 20,
}));

const Button: React.VFC<ButtonProp> = ({ text, onPress }) => (
  <Wrapper onPress={onPress}>
    <Text style={{ color: Colors.white }}>{text}</Text>
  </Wrapper>
);

export default memo(Button);
