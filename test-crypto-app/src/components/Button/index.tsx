import { Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
//utils
import { Colors } from '../../utils/colors';

interface ButtonProp {
  text: string;
  onPress: () => void;
}

const Button = ({ text, onPress }: ButtonProp) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={{ color: Colors.white }}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 230,
    borderRadius: 30,
    paddingVertical: 14,
    backgroundColor: Colors.blue,
    marginVertical: 20,
  },
});

export default memo(Button);
