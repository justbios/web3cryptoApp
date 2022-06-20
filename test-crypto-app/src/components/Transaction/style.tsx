import styled from 'styled-components/native';
// utils
import { Colors } from '../../utils/colors';

export const Wrapper = styled.View({
  alignItems: 'center',
  padding: 18,
  backgroundColor: Colors.lightblue,
  height: 150,
  width: '100%',
  borderRadius: 10
});

export const TransactionBlock = styled.View({
  alignItems: 'center',
  flexDirection: 'row',
  paddingVertical: 5,
  justifyContent: 'space-between',
});

export const Text = styled.Text({
  color: Colors.black,
  fontSize: 12,
});
