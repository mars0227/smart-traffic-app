import React from 'react';
import { Input } from 'react-native-elements';

const NewTextInput = ({ title, handleInputChange, ...props }) => (
  <Input
    {...props}
    label={title}
    onChangeText={handleInputChange}
  />
)

export default NewTextInput;