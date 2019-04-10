import React from 'react';
import { connect } from 'react-redux'
import {
  setReservationAction,
  getConstructionsAction
} from '../actions';
import List from '../components/List';

class partialReservations extends React.Component {
  static navigationOptions = {
    title: 'Reservations',
  };

  componentDidMount() {
    const { constructions } = this.props;
    if (!constructions || constructions.length === 0) {
      console.warn('constructions not found', constructions);
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

  render() {
    const { partialReservations, constructions } = this.props;

    const reservationList = partialReservations.map(item => ({
      key: item.reservation_id,
      title: constructions[item.construction_id - 1],
      subtitle: `${item.date} ${item.time_slot} ${item.creater_name} ${item.material}`
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