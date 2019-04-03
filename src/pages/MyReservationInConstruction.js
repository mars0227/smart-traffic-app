import React from 'react';
import {
  getMyReservationsAction,
  setMyReservationsShowingReservationIdAction
} from '../actions';
import { connect } from 'react-redux'
import List from '../components/List';

class MyReservationInConstruction extends React.Component {
  handleSelectReservation = reservationId => {
    this.props.handleSetMyReservationsShowingReservationId(reservationId);
    this.props.navigation.navigate('Reservation');
  };

  render() {
    const { myReservations, constructions } = this.props;
    const construction = myReservations.filterBy;
    const reservationList = myReservations.data.filter(item =>
      item.construction_id === constructions.indexOf(construction) + 1
    ).map(item => ({
      key: item.reservation_id,
      title: `${item.reservation_id}`,
      subtitle: `${item.date} ${item.material}`
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

const mapStateToProps = state => ({
  login: state.login,
  myReservations: state.myReservations,
  constructions: state.constructions
});

const mapDispatchToProps = dispatch => ({
  handleGetMyReservations: payload => dispatch(getMyReservationsAction(payload)),
  handleSetMyReservationsShowingReservationId: payload => dispatch(setMyReservationsShowingReservationIdAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyReservationInConstruction)