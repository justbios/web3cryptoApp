import { View } from 'react-native';
import styled from 'styled-components/native';
// utils
import { Colors } from '../../utils/colors';

interface WraperProps {
  error?: string;
}

export const Wrapper = styled(View)<WraperProps>((props) => ({
  borderRadius: 12,
  borderWidth: 1,
  borderColor: props.error ? Colors.red : Colors.black,
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
}));

export const InputComponent = styled.TextInput({
  padding: 8,
  flex: 1,
});

export const ErrorText = styled.Text({
  marginVertical: 5,
  fontSize: 12,
  color: Colors.red,
  textAlign: 'center',
});

export const TitleText = styled.Text({
  marginVertical: 5,
});
