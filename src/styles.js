import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const margin = 20;
const width = (Dimensions.get('window').width - (margin * 4)) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  twoColumeContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  twoColumeElement: {
    width,
    margin,
    height: Math.floor(width / 1.168)
  }
});

export default styles;