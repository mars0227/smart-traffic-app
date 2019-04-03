import React from 'react';
import { Input } from 'react-native-elements';
import { AsyncStorage } from 'react-native';

export default class KeepInputWithTitle extends React.Component {
  async componentDidMount() {
    const { name, placeholder, onChangeText } = this.props;
    let key = name || placeholder;
    const defaultValue = await AsyncStorage.getItem(key);
    onChangeText(defaultValue);
  }

  handleInputChange = value => {
    const { name, placeholder, onChangeText } = this.props;
    let key = name || placeholder;
    onChangeText(value);
    AsyncStorage.setItem(key, value);
  }

  render() {
    const { title, ...props } = this.props;

    return (
      <Input
        selectTextOnFocus={true}
        {...props}
        label={title}
        onChangeText={this.handleInputChange.bind(this)}
      />
    )
  }
};