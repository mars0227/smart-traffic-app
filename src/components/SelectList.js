import { ListItem, Divider } from 'react-native-elements';
import { View } from 'react-native';
import React from 'react';

const SelectList = props => (
  <View>
    {
      props.list.map((item, index) => (
        <View key={index}>
          <ListItem
            title={item}
            onPress={() => props.onPress(index)} />
          <Divider />
        </View>
      ))
    }
  </View>);

export default SelectList;
