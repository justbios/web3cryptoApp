import { NativeSyntheticEvent, TextInputChangeEventData, Image, Pressable } from 'react-native';
import React, { memo } from 'react';
import { Wrapper, TitleText, ErrorText, InputComponent } from './style';

interface IInputProps {
  title?: string;
  onChange: (value: string) => void;
  scan?: () => void;
  error?: string;
  value?: string;
}

const Input: React.VFC<IInputProps> = ({ value, scan, onChange, title, error }) => {
  const onChangeText = (text: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (!text.nativeEvent.text) {
      return;
    }
    onChange(text.nativeEvent.text);
  };

  return (
    <>
      {title && <TitleText>{title}</TitleText>}
      <Wrapper>
        <InputComponent value={value} onChange={onChangeText} />
        {scan && (
          <Pressable style={{ width: 40, height: 30, paddingRight: 8 }} onPress={scan}>
            <Image
              style={{ flex: 1 }}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf9-YaWIWH80kKK8WzNukppUJF604LHnFU-Q&usqp=CAU',
              }}
            />
          </Pressable>
        )}
      </Wrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
};

export default memo(Input);
