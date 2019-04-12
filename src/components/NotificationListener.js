import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux'
import {
  getNotificationAction,
  showNotificationSucceededAction,
  setReservationByNotificationAction,
  updateReservationByNotificaitonAction,
  addNotificationRefAction
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

    if (!ref) {
      const notificationSubscription = Notifications.addListener(this.handleNotification);
      this.props.handleAddNotificationRef(notificationSubscription);
    }
  }

  handleNotification = notification => {
    const {
      handleGetNotification,
      handleSetReservation,
      handleUpdateReservation
    } = this.props;
    const {
      type,
      data
    } = notification.data;

    handleGetNotification(notification);

    const payload = modifyPayload(data);

    switch (type) {
      case 'newReservation':
        handleSetReservation(payload);
        break;
      case 'updateReservation':
        handleUpdateReservation(payload);
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
  myReservations: state.myReservations
});

const mapDispatchToProps = dispatch => ({
  handleGetNotification: payload => dispatch(getNotificationAction(payload)),
  handleShowNotificationSucceeded: () => dispatch(showNotificationSucceededAction()),
  handleSetReservation: payload => dispatch(setReservationByNotificationAction(payload)),
  handleUpdateReservation: payload => dispatch(updateReservationByNotificaitonAction(payload)),
  handleAddNotificationRef: payload => dispatch(addNotificationRefAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationListener)