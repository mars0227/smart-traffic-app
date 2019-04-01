import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const margin = 20;
const width = (Dimensions.get('window').width - (margin * 4)) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
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
  },
  image: {
    width: Dimensions.get('window').width - (margin * 2),
    height: 100
  }
});

export default styles;