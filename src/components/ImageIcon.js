import React from 'react';
import { Text } from 'react-native';
import { Tile } from 'react-native-elements';

export default class ImageIcon extends React.Component {
  render() {
    const { name, type, title, backgroundColor, onPress } = this.props;
    return (
      <Tile
        containerStyle={{
          height: 100,
          marginTop: 30,
          marginLeft: 20,
          marginRight: 20,
          borderColor: 'lightgray',
          borderWidth: 1,
        }}
        width={120}
        icon={{ name, type, size: 40 }}
        iconContainerStyle={{ height: 80, width: 120, backgroundColor: backgroundColor }}
        onPress={onPress}
        titleStyle={{display: 'none'}}
      >
        <Text style={{ textAlign: 'center', fontSize: 12 }}>{title}</Text>
      </Tile>
    )
  }
}