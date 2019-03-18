import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Card, CardItem, Text } from 'native-base';

export default class ImageIcon extends React.Component {
  render() {
    return (
      <Card style={{width: '40%', height: 140, marginTop: 20, marginLeft: 20, marginRight: 20}} >
        <CardItem cardBody style={styles.image} button onPress={() => this.props.onPress()}>
          <Image source={require('../../assets/pickup.png')} />
        </CardItem>
        <CardItem>
          <Text>{this.props.title}</Text>
        </CardItem>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellowgreen',
    height: 100,
    width: null
  }
});
