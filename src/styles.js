import {
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';

const windowSize = Dimensions.get('window');

const margin = 20;
const width = (windowSize.width - (margin * 4)) / 2;

const IPHONE_XS_HEIGHT = 812; // iPhone X and XS
const IPHONE_XR_HEIGHT = 896; // iPhone XR and XS Max
const IS_IPHONE_X = Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (windowSize.height === IPHONE_XS_HEIGHT || windowSize.width === IPHONE_XS_HEIGHT || windowSize.height === IPHONE_XR_HEIGHT || windowSize.width === IPHONE_XR_HEIGHT);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: windowSize.width - (margin * 2),
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
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ee',
    width: windowSize.width,
  },
  fullWidth: {
    width: windowSize.width,
  },
  iPhoneXHeaderHeight: {
    height: IS_IPHONE_X ? 24 : 0
  },
  iPhoneXFooterPaddind: {
    paddingBottom: IS_IPHONE_X ? 5 : 0
  }
});

export default styles;
