import React from 'react';
import {
  StyleSheet,
  View,
   AppState
} from 'react-native';
import { connect } from 'react-redux'
import {
  getNotificationAction,
  showNotificationSucceededAction,
  setReservationByNotificationAction,
  updateReservationByNotificaitonAction,
  addNotificationRefAction,
  updateAlertStateByNotificationAction,
  setUserActiveStateAction,
  updateMonitorImageAction,
  updateAppStateAction
} from '../actions'
import { Notifications } from 'expo';
import { Overlay, Button, Text, Divider } from 'react-native-elements';

const convertReservationId = id => typeof id === 'string' ? Number(id) : id;

const modifyPayload = payload => {
  const { reservationId, ...data } = payload;
  return { reservationId: convertReservationId(reservationId), ...data };
}

class NotificationListener extends React.Component {
  componentDidMount() {
    const { ref } = this.props.notification;

    AppState.addEventListener('change', this._handleAppStateChange);

    if (!ref) {
      const notificationSubscription = Notifications.addListener(this.handleNotification);
      this.props.handleAddNotificationRef(notificationSubscription);
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
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
    const {
      login,
      handleGetNotification,
      handleSetReservation,
      handleUpdateReservation,
      handleUpdateAlertStateByNotification,
      handleUpdateImage,
      handleSetUserActiveState
    } = this.props;

    const {
      type,
      data
    } = notification.data;

    switch (type) {
      case 'newReservation':
        const newReservationPayload = modifyPayload(data);
        handleSetReservation(newReservationPayload);
        handleGetNotification(notification);
        break;
      case 'updateReservation':
        const updateReservationPayload = modifyPayload(data);
        handleUpdateReservation(updateReservationPayload);
        handleGetNotification(notification);
        break;
      case 'alertTrafficCongestion':
        handleUpdateAlertStateByNotification({ alertSwitchState: false });
        handleGetNotification(notification);
        break;
      case 'updateImage':
        handleUpdateImage(data);
        handleSetUserActiveState({
          userId: login.userInfo.userId,
          active: true
        });
        break;
      default:
        break;
    }
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
  handleSetReservation: payload => dispatch(setReservationByNotificationAction(payload)),
  handleUpdateReservation: payload => dispatch(updateReservationByNotificaitonAction(payload)),
  handleAddNotificationRef: payload => dispatch(addNotificationRefAction(payload)),
  handleUpdateAlertStateByNotification: payload => dispatch(updateAlertStateByNotificationAction(payload)),
  handleSetUserActiveState: payload => dispatch(setUserActiveStateAction(payload)),
  handleUpdateImage: payload => dispatch(updateMonitorImageAction(payload)),
  handleUpdateAppState: payload => dispatch(updateAppStateAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationListener)