import React from 'react';
import {
  getAllReservationsAction,
  setReservationAction,
  getConstructionsAction
} from '../actions';
import { connect } from 'react-redux'
import List from '../components/List';

class AllReservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  static navigationOptions = {
    title: 'New',
  };

  componentDidMount() {
    const { allReservations, handleGetConstructions, handleGetAllReservations } = this.props;
    if ( !allReservations.data || allReservations.data.length === 0 ){
      handleGetConstructions();
      handleGetAllReservations();
    }
  }

  handleSelectReservation = key => {
    const {
      allReservations,
      handleSetReservation,
      navigation
    } = this.props;
    const reservationId = key;
    const reservation = allReservations.data.filter(reservation => reservation.reservation_id === reservationId)[0];
    handleSetReservation(reservation);
    navigation.navigate('Reservation');
  };

  render() {
    const { allReservations, constructions } = this.props;
    const reservationList = allReservations.data
      .filter(item => item.state === 1)
      .map(item => ({
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
  allReservations: state.allReservations,
  constructions: state.constructions
});

const mapDispatchToProps = dispatch => ({
  handleGetConstructions: () => dispatch(getConstructionsAction()),
  handleGetAllReservations: payload => dispatch(getAllReservationsAction(payload)),
  handleSetReservation: payload => dispatch(setReservationAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllReservations)