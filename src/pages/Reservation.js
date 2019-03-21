import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { connect } from 'react-redux'
import {
  updateReservationAction
} from '../actions';
import { ListItem } from 'react-native-elements';

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

class Reservation extends React.Component {
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
      onPress={() => this.cancel()}
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

  render() {
    return (
      <View>
        {inputList.map((item, index) =>
          <ListItem
            key={index}
            title={item.title}
            style={{height: 50}}
            subtitle={this.getSubtitle(item.title)}
          />
        )}
        {this.getButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
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