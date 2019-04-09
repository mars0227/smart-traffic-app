import React from 'react';
import { connect } from 'react-redux'
import {
  getAllReservationsAction,
  setAllReservationsShowingReservationIdAction,
  getConstructionsAction
} from '../actions';
import List from '../components/List';

class AllReservations extends React.Component {
  static navigationOptions = {
    title: 'All',
  };

  componentDidMount() {
    const { allReservations, handleGetConstructions, handleGetAllReservations } = this.props;
    if ( !allReservations.data || allReservations.data.length === 0 ){
      handleGetConstructions();
      handleGetAllReservations();
    }
  }

  handleSelectReservation = key => {
    const reservationId = key;
    this.props.handleSetAllReservationsShowingReservationId(reservationId);
    this.props.navigation.navigate('Reservation');
  };

  render() {
    const { allReservations, constructions } = this.props;

    const reservationList = allReservations.data.map(item => ({
      key: item.reservation_id,
      title: constructions[item.construction_id - 1],
      subtitle: `${item.date} ${item.time_slot} ${item.creater_name} ${item.material}`
    }));
    console.log('allReservations');
    console.log(allReservations);

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
  login: state.login,
  allReservations: state.allReservations,
  constructions: state.constructions
});

const mapDispatchToProps = dispatch => ({
  handleGetConstructions: () => dispatch(getConstructionsAction()),
  handleGetAllReservations: payload => dispatch(getAllReservationsAction(payload)),
  handleSetAllReservationsShowingReservationId: payload => dispatch(setAllReservationsShowingReservationIdAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllReservations)