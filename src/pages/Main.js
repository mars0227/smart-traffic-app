import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux'
import { Permissions, Notifications } from 'expo';
import { Icon } from 'react-native-elements';

import {
  setExpoPushTokenAction
} from '../actions'
import NotificationListener from '../components/NotificationListener';
import ImageIcon from '../components/ImageIcon';
import styles from '../styles';

const activeFunc = {
  Vendor: {
    myReservations: {
      title: 'MyReservations',
      name: 'truck',
      type: 'font-awesome',
      backgroundColor: 'yellowgreen',
      page: 'MyReservations'
    }
  },
  Manager: {
    reservations: {
      title: 'Reservations',
      name: 'th-list',
      type: 'font-awesome',
      backgroundColor: 'royalblue',
      page: 'ManageReservations'
    },
    camera: {
      title: 'Camera',
      name: 'device-camera-video',
      type: 'octicon',
      backgroundColor: 'darksalmon',
      page: 'MonitorView'
    },
    schedule: {
      title: 'Schedule',
      name: 'calendar',
      type: 'octicon',
      backgroundColor: 'violet',
      page: 'Calendar'
    }
  }
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigatorListener: null
    }
  }

  componentDidMount() {
    const { userInfo } = this.props.login;
    if (!userInfo.expo_push_token) {
      this.getPushTokenOfExpo();
    }
    this.props.navigation.setParams({ menuButton: this.menuButton() });
  }

  componentDidUpdate() {
    const { ok } = this.props.login;
    if (!ok) {
      this.props.navigation.replace('Login');
    }
  }

  getPushTokenOfExpo = async () => {
    const { userInfo } = this.props.login;
    try {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        return;
      }

      let token = await Notifications.getExpoPushTokenAsync();

      if (!userInfo.expo_push_token || userInfo.expo_push_token !== token) this.props.handleSetExpoPushToken({ userId: userInfo.userId, token });
    } catch (err) {
      console.warn('err', err);
    }
  }

  handleLogout = () => {

  }

  menuButton = () => (
    <Icon
      color='white'
      name='more-vert'
      onPress={this.props.navigation.openDrawer}
    />
  );

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Smart Traffic Management',
      headerRight: navigation.getParam('menuButton')
    }
  };

  onFunctionPress = (pageName) => {
    pageName && this.props.navigation.navigate(pageName);
  };

  render() {
    const { identity = 'Manager' } = this.props.login.userInfo;
    const functions = activeFunc[identity];

    return (
      <View style={styles.twoColumeContainer}>
        <NotificationListener />
        {Object.keys(functions).map(keys => <ImageIcon
          name={functions[keys].name}
          type={functions[keys].type}
          title={functions[keys].title}
          backgroundColor={functions[keys].backgroundColor}
          style={styles.twoColumeElement}
          key={keys}
          onPress={() => this.onFunctionPress(functions[keys].page)} />)}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
  notification: state.notification
});

const mapDispatchToProps = dispatch => ({
  handleSetExpoPushToken: payload => dispatch(setExpoPushTokenAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);