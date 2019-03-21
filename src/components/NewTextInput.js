import React from 'react';
import { Input } from 'react-native-elements';

const NewTextInput = ({ title, value, handleInputChange }) => (
  <Input
    label={title}
    value={value}
    onChangeText={handleInputChange}
  />
)

export default NewTextInput;