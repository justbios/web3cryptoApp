import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import React, { memo } from 'react';
import { Wrapper, TitleText, ErrorText, InputComponent } from './style';

interface IInputProps {
  title?: string;
  onChange: (value: string) => void;
  error?: string;
}

const Input: React.VFC<IInputProps> = ({ onChange, title, error }) => {
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
        <InputComponent onChange={onChangeText} />
      </Wrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
};

export default memo(Input);
