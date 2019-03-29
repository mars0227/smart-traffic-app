import React from 'react';
import { TextInput, AsyncStorage } from 'react-native';

export default class KeepInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: undefined
    }
  }

  async componentDidMount() {
    const { name, placeholder } = this.props;
    let key = name || placeholder;
    const defaultValue = await AsyncStorage.getItem(key);

    if (defaultValue) {
      const payload = {
        defaultValue,
        selectTextOnFocus: true,
        autoFocus: true
      }
      this.setState(payload);
    }
  }

  handleInputChange = value => {
    const { name, placeholder, onChangeText } = this.props;
    let key = name || placeholder;
    onChangeText(value);
    AsyncStorage.setItem(key, value);
  }

  handleOnBlur = () => {
    const { value, onChangeText } = this.props;

    if (!value) {
      const { defaultValue } = this.state;
      if (defaultValue) onChangeText(defaultValue);
    }
  }

  render() {
    return (
      <TextInput
        {...this.props}
        {...this.state}
        autoFocus={true}
        onChangeText={this.handleInputChange.bind(this)}
        onBlur={this.handleOnBlur.bind(this)}
      />
    )
  }
};