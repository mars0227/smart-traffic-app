import React from 'react';
import { TextInput, AsyncStorage } from 'react-native';

export default class KeepInput extends React.Component {
  async componentDidMount() {
    const { name, placeholder, onChangeText } = this.props;
    let key = name || placeholder;
    const defaultValue = await AsyncStorage.getItem(key);

    if (defaultValue) {
      onChangeText(defaultValue);
    }
  }

  handleInputChange = value => {
    const { name, placeholder, onChangeText } = this.props;
    let key = name || placeholder;
    onChangeText(value);
    AsyncStorage.setItem(key, value);
  }

  render() {
    return (
      <TextInput
        selectTextOnFocus={true}
        {...this.props}
        onChangeText={this.handleInputChange.bind(this)}
      />
    )
  }
};