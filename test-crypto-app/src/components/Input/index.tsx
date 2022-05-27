import {
  View,
  StyleSheet,
  TextInput,
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import React, { memo } from 'react';
import { Colors } from '../../utils/colors';

interface InputType {
  title?: string;
  onChange: (value: string) => void;
  error?: boolean;
}

function Input({ onChange, title, error }: InputType) {
  const onChangeText = (text: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (!text.nativeEvent.text) {
      return;
    }
    onChange(text.nativeEvent.text);
  };

  return (
    <View>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={[styles.container, { borderColor: error ? Colors.red : Colors.black }]}>
        <TextInput style={styles.input} onChange={onChangeText} />
      </View>
      {error && <Text style={styles.errorText}>data is`t valid</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  title: {
    marginVertical: 5,
  },
  input: {
    padding: 8,
  },
  errorText: {
    marginVertical: 5,
    fontSize: 12,
    color: Colors.red,
    textAlign: 'center',
  },
});

export default memo(Input);
