import React from 'react';
import {
  ListItem,
  Divider
} from 'react-native-elements';
import {
  View,
  ScrollView
} from 'react-native';
import styles from '../styles';

const List = ({list, handlePress, ...props}) => (
  <ScrollView>
    {list.map(item =>
      <View key={item.key}>
        <ListItem
          key={item.key}
          title={item.title}
          subtitle={item.subtitle}
          style={styles.listItem}
          leftAvatar={item.leftAvatar}
          subtitleStyle={styles.listItemSubtitle}
          onPress={() => handlePress(item.key)}
          {...props}
        />
        <Divider />
      </View>
    )}
  </ScrollView>
);

export default List;