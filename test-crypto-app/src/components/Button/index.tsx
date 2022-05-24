import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { memo } from 'react';
//utils
import { colors } from '../../utils/colors';

interface ButtonProp {
  text: string;
  onPress: () => void;
}

const Button = ({ text, onPress }: ButtonProp) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={{ color: colors.white }}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 230,
    borderRadius: 30,
    paddingVertical: 14,
    backgroundColor: colors.blue,
  },
});

export default memo(Button);
