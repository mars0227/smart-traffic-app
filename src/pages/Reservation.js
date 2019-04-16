import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { connect } from 'react-redux'
import {
  updateReservationAction
} from '../actions';
import { ListItem } from 'react-native-elements';
import ImageView from '../components/ImageView';
import { route } from '../apis/api';
import styles from '../styles';

const reservationState = [
  'Created',
  'Accepted',
  'Refused',
  'Canceled'
];

const pictureUrl = route;

class Reservation extends React.Component {
  getButtonTitle = () => {
    const { reservation } = this.props;
    const { state } = reservation.data;

    return reservationState[state - 1] || 'Error';
  }

  getSubtitle = title => {
    const { reservation, constructions } = this.props;

    const {
      date,
      construction_id,
      time_slot: timeSlot,
      license_plate_number: licensePlateNumber,
      material } = reservation.data;

    const location = constructions[construction_id - 1];

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
    const { reservation, login } = this.props;
    const { userId } = login.userInfo;
    this.props.handleUpdateReservation({
      state: payload,
      reservationId: reservation.data.reservation_id,
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
    const { reservation, login } = this.props;
    const { identity } = login.userInfo;
    const { state: stateNum } = reservation.data;

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

  getBadge = payload => {
    const { login, allReservations } = this.props;
    const { identity } = login.userInfo;
    if (identity === 'Manager' && payload) {
      const { timeSlot = null, date = null} = payload;

      const filteredArray = allReservations.data.filter(
        reservation =>
          (reservation.date === date
            && reservation.time_slot === timeSlot
            && reservation.state === reservationState.indexOf('Accepted') + 1)
      );

      return {
        value: filteredArray.length,
        status: 'primary'
      };
    }

    return null;
  }

  render() {
    const { reservation } = this.props;
    const { date, time_slot: timeSlot, reservation_id: reservationId } = reservation.data;
    const badge = this.getBadge({ date, timeSlot });
    const bookedInfo = badge
      ? {
        rightTitle: 'Booked',
        badge
      }
      : {};

    const inputList = [
      {
        title: 'Location',
      },
      {
        title: 'Date',
      },
      {
        title: 'Time Slot',
        ...bookedInfo
      },
      {
        title: 'License plate number',
      },
      {
        title: 'Materials',
      },
    ];

    return (
      <View style={customStyles.container}>
        <View style={customStyles.list} >
          {inputList.map((item, index) =>
            <ListItem
              {...item}
              key={index}
              style={customStyles.listItem}
              subtitle={this.getSubtitle(item.title)}
              subtitleStyle={styles.listItemSubtitle}
            />
          )}
          <ImageView
            style={customStyles.image}
            uri={`${pictureUrl}/${reservationId}/1.jpg`}
          />
        </View>
        <View style={customStyles.button}>
          {this.getButton()}
        </View>
      </View>
    );
  }
}

const customStyles = StyleSheet.create({
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
  listItem: {
    height: 50,
    margin: 5
  },
  image: {
    width: 120,
    height: 80,
    margin: 5
  }
});

const mapStateToProps = (state) => ({
  login: state.login,
  allReservations: state.allReservations,
  reservation: state.reservation,
  constructions: state.constructions
});

const mapDispatchToProps = dispatch => ({
  handleUpdateReservation: payload => dispatch(updateReservationAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reservation)