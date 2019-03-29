import React from 'react';
import { connect } from 'react-redux'
import {
  ListItem,
  Divider
} from 'react-native-elements';
import {
  View,
  ScrollView
} from 'react-native';
import {
  getAllReservationsAction,
  setAllReservationsShowingReservationIdAction,
  getConstructionsAction
} from '../actions';

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

  handleSelectReservation = reservationId => {
    this.props.handleSetAllReservationsShowingReservationId(reservationId);
    this.props.navigation.navigate('Reservation');
  };

  render() {
    const { allReservations, constructions } = this.props;

    return (
      <ScrollView>
        {allReservations.data.map((item, index) =>
          <View key={index}>
            <ListItem
              key={index}
              title={constructions[item.construction_id - 1]}
              style={{height: 50}}
              chevron
              subtitle={`${item.date} ${item.time_slot} ${item.creater_name} ${item.material}`}
              onPress={() => this.handleSelectReservation(item.reservation_id)}
            />
            <Divider />
          </View>
        )}
      </ScrollView>
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