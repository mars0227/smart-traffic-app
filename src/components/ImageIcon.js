import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Tile } from 'react-native-elements';

export default class ImageIcon extends React.Component {
  render() {
    const { name, type, title, backgroundColor, onPress } = this.props;
    return (
      <Tile
        containerStyle={{
          height: 100,
          width: 120,
          marginTop: 30,
          marginLeft: 20,
          marginRight: 20
        }}
        icon={{ name, type, size: 40 }}
        iconContainerStyle={{  height: 80, width: 120, backgroundColor: backgroundColor }}
        onPress={onPress}
      >
        <Text style={{ textAlign: 'center', fontSize: 12 }}>{title}</Text>
      </Tile>
    )
  }
}