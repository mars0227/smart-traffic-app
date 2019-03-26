import React from 'react';
import { StyleSheet, View } from 'react-native';
import ImageIcon from '../components/ImageIcon';
import { connect } from 'react-redux'
import {
  setExpoPushTokenAction,
  getNotificationAction,
  showNotificationSucceededAction
} from '../actions'
import { Permissions, Notifications } from 'expo';
import { Overlay, Button, Text, Divider } from 'react-native-elements';

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
      page: 'AllReservations'
    },
    camera: {
      title: 'Camera',
      name: 'device-camera-video',
      type: 'octicon',
      backgroundColor: 'darksalmon',
    }
  }
};

class Main extends React.Component {
  componentDidMount() {
    const { userInfo } = this.props.login;
    if (!userInfo.expo_push_token) {
      this.getPushTokenOfExpo();
    }
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    this.props.handleGetNotification(notification);
  };

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

  static navigationOptions = {
    title: 'Smart Traffic Management',
  };

  onFunctionPress = (pageName) => {
    pageName && this.props.navigation.navigate(pageName);
  };

  handleLogout = () => {

  };

  handleCloseOverlay = () => {
    this.props.handleShowNotificationSucceeded();
  };

  render() {
    const { identity } = this.props.login.userInfo;
    const functions = activeFunc[identity];
    const { data, enableOverlay } = this.props.notification;

    return (
      <View style={styles.container}>
        <Overlay
          isVisible={enableOverlay}
          height={200}
        >
          <View style={{ flex:1 , justifyContent: 'space-around'}}>
            <Text h4 style={{textAlign: 'center'}} >{data.title}</Text>
            <Divider />
            <Text>{data.body}</Text>
            <Button onPress={this.handleCloseOverlay} title='OK' />
          </View>
        </Overlay>
        {Object.keys(functions).map(keys => <ImageIcon
          name={functions[keys].name}
          type={functions[keys].type}
          title={functions[keys].title}
          backgroundColor={functions[keys].backgroundColor}
          key={keys}
          onPress={() => this.onFunctionPress(functions[keys].page)} />)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

const mapStateToProps = (state) => ({
  login: state.login,
  notification: state.notification
});

const mapDispatchToProps = dispatch => ({
  handleSetExpoPushToken: payload => dispatch(setExpoPushTokenAction(payload)),
  handleGetNotification: payload => dispatch(getNotificationAction(payload)),
  handleShowNotificationSucceeded: () => dispatch(showNotificationSucceededAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)