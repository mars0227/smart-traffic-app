import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const ImageIcon = ({ name, type, title, backgroundColor, onPress, style }) =>
  (
    <TouchableOpacity onPress={onPress} style={{
      ...style,
      borderColor: 'lightgray',
      borderWidth: 1
    }}>
      <View
        onPress={onPress}
        style={{
          backgroundColor,
          flex: 3,
          justifyContent: 'center',
        }}>
        <Icon name={name} type={type} size={40} color='white' />
      </View>
      <View onPress={onPress} style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', fontSize: 14 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

export default ImageIcon;