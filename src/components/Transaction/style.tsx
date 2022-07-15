import styled from 'styled-components/native';
// utils
import { Colors } from '../../utils/colors';

export const Wrapper = styled.View({
  alignItems: 'center',
  padding: 18,
  backgroundColor: Colors.lightblue,
});

export const Transaction_Block = styled.View({
  alignItems: 'center',
  flexDirection: 'row',
  paddingVertical: 5,
  justifyContent: 'space-between',
});

export const Text = styled.Text({
  color: Colors.black,
  fontSize: 12,
});
