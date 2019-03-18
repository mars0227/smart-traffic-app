import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  static navigationOptions = {
    title: 'New reservation',
  };

  onInputChange = (key, value) => {
    this.setState({
      [key]: value
    })
    {/*console.warn('id', this.state.identity);*/ }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>new page 1</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});