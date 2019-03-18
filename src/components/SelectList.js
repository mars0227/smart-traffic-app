import { ListItem, Text } from 'react-native-elements';
import { View } from 'react-native';

export const SelectList = ({ title, list, handleSelect }) => (
  <View>
    <Text>{title}</Text>
    {
      list.map(item => (
        <ListItem title={item} onPress={() => handleSelect(item)} />
      ))
    }
  </View>
);