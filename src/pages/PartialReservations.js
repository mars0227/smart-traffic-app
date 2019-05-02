import React from 'react';
import { connect } from 'react-redux'
import {
  setReservationAction,
  getConstructionsAction
} from '../actions';
import List from '../components/List';
import { reservationState } from '../constants';
import { Avatar } from 'react-native-elements';

class partialReservations extends React.Component {
  static navigationOptions = {
    title: 'Reservations',
  };

  componentDidMount() {
    const { constructions, handleGetConstructions } = this.props;
    if (!constructions || constructions.length === 0) {
      handleGetConstructions();
    }
  }

  handleSelectReservation = key => {
    const reservationId = key;
    const { partialReservations } = this.props;
    const reservation = partialReservations.filter(reservation => reservation.reservation_id === reservationId)[0];
    this.props.handleSetReservation(reservation);
    this.props.navigation.navigate('Reservation');
  };

  colorOfState = {
    'Created': 'gold',
    'Accepted': 'cornflowerblue',
    'Refused': 'lightgray',
    'Canceled': 'lightgray'
  };

  getColor = state => this.colorOfState[reservationState[state - 1]];

  render() {
    const { partialReservations, constructions } = this.props;

    const reservationList = partialReservations.map(item => ({
      key: item.reservation_id,
      title: constructions[item.construction_id - 1],
      subtitle: `${item.date} ${item.time_slot} ${item.creater_name} ${item.material}`,
      leftAvatar: <Avatar
        rounded
        size={15}
        overlayContainerStyle={{ backgroundColor: this.getColor(item.state) }}
      />
    }));

    return (
      <List
        list={reservationList}
        chevron
        handlePress={this.handleSelectReservation.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  partialReservations: state.partialReservations,
  constructions: state.constructions
});

const mapDispatchToProps = dispatch => ({
  handleGetConstructions: () => dispatch(getConstructionsAction()),
  handleSetReservation: payload => dispatch(setReservationAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(partialReservations)