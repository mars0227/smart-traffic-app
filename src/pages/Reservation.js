import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { connect } from 'react-redux'
import {
  setReservationAction
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

class Reservation extends React.Component {
  static navigationOptions = {
    title: 'Reservation',
  };

  cancel() {
  
  }

  getReservationById = () => {
    const { myReservations } = this.props;
    const reservations = myReservations.data;
    const index = myReservations.showingReservationId;
    return reservations.filter(item => item.reservation_id === index)[0];
  }

  getButtonTitle = () => {
    const reservation = this.getReservationById();
    const { state } = reservation;

    switch (state) {
      case 1:
        return 'cancel';
      case 2:
        return 'accepted';
      case 3:
      default:
        return 'refused';
    }
  }

  getButtonDisableState = () => {
    const reservation = this.getReservationById();
    const { state } = reservation;

    switch (state) {
      case 1:
        return false;
      default:
        return true;
    }
  }

  getSubtitle = title => {
    const { myReservations } = this.props;
    const reservation = this.getReservationById();
    const location = myReservations.filterBy;

    const {
      date,
      time_slot: timeSlot,
      license_plate_number: licensePlateNumber,
      material } = reservation;

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
        <Button
          color='royalblue'
          onPress={() => this.cancel()}
          title={this.getButtonTitle()}
          disabled={this.getButtonDisableState()}
        />
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
  myReservations: state.myReservations
});

const mapDispatchToProps = dispatch => ({
  handleCreateReservation: payload => dispatch(setReservationAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reservation)