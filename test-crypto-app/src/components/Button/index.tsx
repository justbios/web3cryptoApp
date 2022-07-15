import { Text, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
//libs
import styled from 'styled-components/native';
//utils
import { Colors } from '../../utils/colors';

interface IWrapper {
  width?: number | string;
}
interface ButtonProp {
  text: string;
  onPress: () => void;
  width?: number | string;
}
const Wrapper = styled(TouchableOpacity)<IWrapper>(({ width }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  width: width || 230,
  borderRadius: 30,
  paddingVertical: 14,
  backgroundColor: Colors.blue,
  marginVertical: 20,
  maxHeight: 50,
}));

const Button: React.VFC<ButtonProp> = ({ width, text, onPress }) => (
  <Wrapper width={width} onPress={onPress}>
    <Text style={{ color: Colors.white }}>{text}</Text>
  </Wrapper>
);

export default memo(Button);
