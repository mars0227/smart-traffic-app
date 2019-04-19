import React from 'react';
import {
  StyleSheet,
  View,
  AppState
} from 'react-native';
import { connect } from 'react-redux';
import { Notifications, Permissions } from 'expo';
import {
  Overlay,
  Button,
  Text,
  Divider
} from 'react-native-elements';

import {
  getNotificationAction,
  showNotificationSucceededAction,
  addNotificationRefAction,
  setUserActiveStateAction,
  updateAppStateAction,
  setExpoPushTokenAction
} from '../actions'

class NotificationListener extends React.Component {
  componentDidMount() {
    const {
      notification,
      handleAddNotificationRef
    } = this.props;
    const { ref } = notification;

    AppState.addEventListener('change', this.handleAppStateChange);

    if (!ref) {
      const notificationSubscription = Notifications.addListener(this.handleNotification);
      handleAddNotificationRef(notificationSubscription);
    }

    this.getExpoPushToken();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  getExpoPushToken = async () => {
    const {
      login,
      handleSetExpoPushToken
    } = this.props;
    const { userInfo } = login;
    const { userId, expoPushToken } = userInfo;

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
        console.warn('warn! no permission of notification on this phone');
        return;
      }

      let token = await Notifications.getExpoPushTokenAsync();

      if (!expoPushToken || expoPushToken !== token) {
        handleSetExpoPushToken({ userId, expoPushToken: token });
      }
    } catch (err) {
      console.warn('err', err);
    }
  }

  handleAppStateChange = (nextAppState) => {
    const {
      login,
      system,
      handleSetUserActiveState,
      handleUpdateAppState
    } = this.props;

    if (
      system.appState.match(/active/) &&
      ( nextAppState === 'background' || nextAppState === 'inactive' )
    ) {
      handleSetUserActiveState({
        userId: login.userInfo.userId,
        active: false
      });
      handleUpdateAppState(nextAppState);
    } else if (
      system.appState.match(/background|inactive/) &&
      ( nextAppState === 'active' )
    ) {
      handleSetUserActiveState({
        userId: login.userInfo.userId,
        active: true
      });
      handleUpdateAppState(nextAppState);
    }
  };

  handleNotification = notification => {
    this.props.handleGetNotification(notification);
  };

  handleCloseOverlay = () => {
    this.props.handleShowNotificationSucceeded();
  };

  render() {
    const { data, enableOverlay } = this.props.notification;

    return (
      <Overlay
        isVisible={enableOverlay}
        height={200}
      >
        <View style={styles.container}>
          <Text h4 style={styles.title}>{data.title}</Text>
          <Divider />
          <Text>{data.body}</Text>
          <Button onPress={this.handleCloseOverlay} title='OK' />
        </View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },
  title: {
    textAlign: 'center'
  }
});

const mapStateToProps = (state) => ({
  login: state.login,
  notification: state.notification,
  myReservations: state.myReservations,
  system: state.system
});

const mapDispatchToProps = dispatch => ({
  handleGetNotification: payload => dispatch(getNotificationAction(payload)),
  handleShowNotificationSucceeded: () => dispatch(showNotificationSucceededAction()),
  handleAddNotificationRef: payload => dispatch(addNotificationRefAction(payload)),
  handleSetUserActiveState: payload => dispatch(setUserActiveStateAction(payload)),
  handleUpdateAppState: payload => dispatch(updateAppStateAction(payload)),
  handleSetExpoPushToken: payload => dispatch(setExpoPushTokenAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationListener)