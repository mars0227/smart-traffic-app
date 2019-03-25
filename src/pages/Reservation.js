import React from 'react';
import { StyleSheet, Button, View, Modal, TouchableHighlight, Image } from 'react-native';
import { connect } from 'react-redux'
import {
  updateReservationAction
} from '../actions';
import { ListItem, Icon } from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';

const inputList = [
  {
    title: 'Location',
  },
  {
    title: 'Date',
  },
  {
    title: 'Time Slot',
  },
  {
    title: 'License plate number',
  },
  {
    title: 'Materials',
  },
];

const reservationState = [
  'Created',
  'Accepted',
  'Refused',
  'Canceled'
];

const pictureUrl = __DEV__
  ? 'http://172.20.10.3:3002'
  : 'http://www.itrackcon.com/stserver';

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }

  getReservation = () => {
    const { login, myReservations, allReservations } = this.props;
    const { identity } = login.userInfo;
    return identity === 'Manager'
      ? allReservations
      : myReservations;
  }

  getReservationById = () => {
    const reservations = this.getReservation();
    const { data, showingReservationId } = reservations;
    return data.filter(item => item.reservation_id === showingReservationId)[0];
  }

  getButtonTitle = () => {
    const reservation = this.getReservationById();
    const { state } = reservation;

    return reservationState[state - 1] || 'Error';
  }

  getSubtitle = title => {
    const reservation = this.getReservationById();

    const {
      date,
      construction_id,
      time_slot: timeSlot,
      license_plate_number: licensePlateNumber,
      material } = reservation;

    const location = this.props.constructions[construction_id - 1];

    switch (title) {
      case 'Location':
        return location;
      case 'Date':
        return date;
      case 'Time Slot':
        return timeSlot;
      case 'License plate number':
        return licensePlateNumber;
      case 'Materials':
        return material;
      default:
        return '';
    }
  }

  handleChangeState = payload => {
    const { userId } = this.props.login.userInfo;
    const reservation = this.getReservationById();
    this.props.handleUpdateReservation({
      state: payload,
      reservationId: reservation.reservation_id,
      userId
    });  //update state when get update succcess
  }

  accept() {
    this.handleChangeState('Accepted');
  }

  refuse() {
    this.handleChangeState('Refused');
  }

  cancel() {
    this.handleChangeState('Canceled');
  }

  acceptButton = () => (
    <Button
      color='royalblue'
      onPress={() => this.accept()}
      title='Accept'
    />
  );

  refuseButton = () => (
    <Button
      color='red'
      onPress={() => this.refuse()}
      title='Refuse'
    />
  );

  cancelButton = () => (
    <Button
      color='red'
      onPress={this.setModalVisible}
      title='Cancel'
    />
  );

  statusButton = () => (
    <Button
      disabled
      onPress={() => {}}
      title={this.getButtonTitle()}
    />
  );

  getButton = () => {
    const { identity } = this.props.login.userInfo;
    const reservation = this.getReservationById();
    const { state: stateNum } = reservation;

    if (reservationState[stateNum - 1] === 'Created') {
        return identity === 'Manager'
          ? (<View>
            {this.acceptButton()}
            {this.refuseButton()}
          </View>)
          : this.cancelButton();    
    }
    return this.statusButton();
  }

  setModalVisible = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible
    });
  }

  render() {
    const reservation = this.getReservationById();

    return (
      <View style={styles.container}>
        <View style={styles.list} >
        {inputList.map((item, index) =>
          <ListItem
            key={index}
            title={item.title}
            style={{height: 50}}
            subtitle={this.getSubtitle(item.title)}
          />
        )}
          <View style={styles.pictureContainer}>
            <Modal
              visible={this.state.modalVisible}
              transparent={false}
              animationType='fade'>
              <ImageViewer
                saveToLocalByLongPress={false}
                imageUrls={[{ url: `${pictureUrl}/${reservation.reservation_id}.jpg` }]}
                renderIndicator={() => { }}
                renderHeader={() => (
                  <View style={styles.headerContainer}>
                    <Icon
                      raised
                      name='close'
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}
                      />
                  </View>
                )}
                />
            </Modal>
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <Image
                style={{ width: 100, height: 120 }}
                source={{ uri: `${pictureUrl}/${reservation.reservation_id}.jpg` }}
              />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.button}>
          {this.getButton()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  list: {
    flex: 5
  },
  button: {
    flex: 1
  },
  image: {
    width: 120,
    height: 80
  },
  pictureContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 1
  },
});

const mapStateToProps = (state) => ({
  login: state.login,
  myReservations: state.myReservations,
  allReservations: state.allReservations,
  constructions: state.constructions
});

const mapDispatchToProps = dispatch => ({
  handleUpdateReservation: payload => dispatch(updateReservationAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reservation)