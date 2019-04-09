import {
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';

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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width - (margin * 2),
    height: 100
  },
  listItem: {
    flex: 1,
    margin: 5
  },
  listItemSubtitle: {
    color: 'slategray'
  },
  text: {
    fontFamily: Platform.OS !== 'ios'
      ? 'sans-serif'
      : 'Arial'
  }
});

export default styles;
